import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import './MusicPlayer.css'

const MusicPlayer = () => {
    const youtubeURL = useRef();
    const [video, setVideo] = useState();
    const [playlist, setPlaylist] = useState([]);

    // Function to get ID from a youtube URL
    const youtube_parser = (url) => {
        console.log("a "+ url);
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
        if (title.length > 70){
            title = title.slice(0, 70);
            return title+"..."
        }
        return title;
    }

    // Get data from API 
    const getData = (link) => {
        const id = youtube_parser(link);
        console.log(id);
        const url = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+id+`&key=${window.__RUNTIME_CONFIG__.API_KEY}`;
        fetch(url)
        .then(response => response.json())
        .then(response => {
            if (response.items.length != 0)
            setVideo(response.items[0]);
            if (playlist.find(element => element.id === youtube_parser(link)) == undefined) {
                setPlaylist([...playlist, {
                    title: title_parser(response.items[0].snippet.title),
                    channelTitle: title_parser(response.items[0].snippet.channelTitle),
                    url: link,
                    id: youtube_parser(link),
                    duration: duration_parser(response.items[0].contentDetails.duration)
                }])
            }
        })
        .catch();
    }

    // Delete song from playlist
    const deleteSong = (id) => {
        youtubeURL.current = undefined;
        document.getElementById("music-player-input-url").value="";
        setVideo(undefined);
        setPlaylist(playlist => playlist.filter(track => track.id != id));
    }

    return (
        <div>
            {/* Input field */}
            <input id="music-player-input-url" type="text" onChange={(e) => youtubeURL.current = e.target.value}/>
            <input type="button" value="Add" onClick={(e) => {document.getElementById("music-player-input-url").value=""; getData(youtubeURL.current)}}/>

            { 
                // Block the initial state (undefined) of the "video" variable
                video == undefined
                ? <div />
                :
                    <div id='music-player-display'>
                        <div id="music-player-current-track">
                            <iframe id="ytplayer" type="text/html" width="640" height="360" src={"https://www.youtube.com/embed/"+video.id+"?autoplay=1"} frameBorder="0"></iframe>
                            <div>{video.snippet.title}</div>
                            <div>{video.snippet.channelTitle}</div> 
                        </div>
                        <div id="music-player-playlist">
                            {playlist.map(playlist => (
                                <li id="music-player-track" key={playlist.id}>
                                    <div id="music-player-track-title" onClick={(e) => {youtubeURL.current = playlist.url; getData(youtubeURL.current)}}>
                                        {playlist.title} 
                                    </div>
                                    <div id='music-player-info'>
                                        <div id="music-player-track-channel">{playlist.channelTitle}</div>
                                        <svg id="music-player-close-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16" onClick={(e) => deleteSong(playlist.id)}>
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                        </svg>
                                        <div id="music-player-duration">{
                                            (playlist.duration.hour != 0 
                                                ? 
                                                    playlist.duration.hour < 10 
                                                    ?
                                                        "0"+playlist.duration.hour+":"
                                                    :
                                                        playlist.duration.hour+":"
                                                : 
                                                    ""
                                            )
                                            +
                                            (playlist.duration.min != 0 || playlist.duration.hour != 0
                                                ? 
                                                    playlist.duration.min < 10 
                                                    ?
                                                        "0"+playlist.duration.min+":"
                                                    :
                                                        playlist.duration.min+":"
                                                : 
                                                    ""
                                            )
                                            +
                                            (playlist.duration.sec != 0 || playlist.duration.min != 0 || playlist.duration.hour != 0
                                                ? 
                                                    playlist.duration.sec < 10 
                                                    ?
                                                        "0"+playlist.duration.sec
                                                    :
                                                        playlist.duration.sec
                                                : 
                                                    ""
                                            )
                                            
                                        }</div>
                                    </div>
                                </li>
                            ))}
                        </div>
                    </div>
            }
        </div>
    )
}
export default MusicPlayer;
