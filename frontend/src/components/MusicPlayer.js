import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import YouTube, { YouTubeProps } from 'react-youtube';
import './MusicPlayer.css'

const MusicPlayer = () => {
    // Initialize
    const youtubeURL = useRef();
    const [playlist, setPlaylist] = useState([]);
    const [curIndex, setCurIndex] = useState(-1);
    const cardinalNum = [ "st", "nd", "rd" ];
    const opts: YouTubeProps['opts'] = {
        height: '360',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
    };

    console.log(opts);

    // Function to get ID from a youtube URL
    const youtube_parser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    // Function to get duration
    const duration_parser = (time) => {
        var regExp = /\d+/g;
        var match = time.match(regExp);
        let hour = 0, min = 0, sec = 0;
        if (match.length == 1){
            sec = match[0];
        }
        if (match.length == 2){
            sec = match[1];
            min = match[0];
        }
        if (match.length == 3){
            sec = match[2];
            min = match[1];
            hour = match[0];
        }
        const duration = {
            hour: hour,
            min: min,
            sec: sec
        }
        return duration;
    }

    // Cut down the song title 
    const title_parser = (title) => {
        if (title.length > 55){
            title = title.slice(0, 55);
            return title+"..."
        }
        return title;
    }

    // Get data from API 
    const getData = (link) => {
        const id = youtube_parser(link);
        const url = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+id+`&key=${window.__RUNTIME_CONFIG__.API_KEY}`;
        fetch(url)
        .then(response => response.json())
        .then(response => {
            if (playlist.find(element => element.id === youtube_parser(link)) == undefined) { // Check if a track existed or not
                setPlaylist([...playlist, {
                    title: title_parser(response.items[0].snippet.title),
                    channelTitle: title_parser(response.items[0].snippet.channelTitle),
                    url: link,
                    id: youtube_parser(link),
                    duration: duration_parser(response.items[0].contentDetails.duration)
                }])
                if (curIndex === -1) setCurIndex(playlist.length); // avoid default state
            }
        })
        .catch();
    }
    
    // Show the index of playing track
    useEffect(() => { 
        if (curIndex < 0) return;
        const curCarNum = (((curIndex % 10) < 3 && (curIndex < 9 || curIndex > 19))? cardinalNum[curIndex % 10] : "th");
        console.log("Playing track " + (curIndex + 1) + curCarNum);
    }, [curIndex]);

    // Delete song from playlist
    const deleteSong = (id, index) => {
        youtubeURL.current = undefined;
        setPlaylist(playlist => playlist.filter(track => track.id != id));
        if (index < curIndex) setCurIndex(curIndex => curIndex - 1)
        else if (index == curIndex) setCurIndex(curIndex => (curIndex >= playlist.filter(track => track.id != id).length ? 0 : curIndex));
    }

    return (
        <div id="music-player">
            {/* Input field */}
            <div id="music-player-input">
                <input id="music-player-input-url" type="text" onChange={(e) => youtubeURL.current = e.target.value}/>
                <input id="music-player-input-button" type="button" value="Add" onClick={() => {document.getElementById("music-player-input-url").value=""; getData(youtubeURL.current)}}/>
            </div>
            <div id='music-player-display'>
                {
                    playlist.length == 0 // Check if the playlist empty
                    ? <div />
                    : 
                    // else
                    <div id="music-player-current-track">
                        <YouTube videoId={playlist[curIndex].id} opts={opts} onStateChange={(e) => {if (e.data == 0) setCurIndex(curIndex => (curIndex + 1 >= playlist.length ? 0 : curIndex + 1))}}/>
                    </div>
                }
                <div id="music-player-playlist">
                    {playlist.map((track, index) => (
                        <li id={`music-player-track${playlist.length > 0 ? (index == curIndex ? "-active" : "") : ""}`} key={index}>
                            <div id="music-player-track-flex">
                                <div id="music-player-track-title" onClick={() => {setCurIndex(index);}}>{track.title}</div>
                                <svg id="music-player-close-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16" onClick={(e) => deleteSong(track.id, index)}>
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                </svg>
                            </div>
                            <div id='music-player-info'>
                                <div id="music-player-track-channel">{track.channelTitle}</div>
                                <div id="music-player-duration">
                                    {
                                        (track.duration.hour != 0 
                                            ? 
                                                track.duration.hour < 10 
                                                ?
                                                    "0"+track.duration.hour+":"
                                                :
                                                    track.duration.hour+":"
                                            : 
                                                ""
                                        )
                                        +
                                        (track.duration.min != 0 || track.duration.hour != 0
                                            ? 
                                                track.duration.min < 10 
                                                ?
                                                    "0"+track.duration.min+":"
                                                :
                                                    track.duration.min+":"
                                            : 
                                                ""
                                        )
                                        +
                                        (track.duration.sec != 0 || track.duration.min != 0 || track.duration.hour != 0
                                            ? 
                                                track.duration.sec < 10 
                                                ?
                                                    "0"+track.duration.sec
                                                :
                                                    track.duration.sec
                                            : 
                                                ""
                                        )
                                    }
                                </div>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default MusicPlayer;
