import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import "./MusicPlayer.css";

const MusicPlayer = () => {
  // Initialize
  const youtubeURL = useRef();
  const [playlist, setPlaylist] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [random, setRandom] = useState(0);
  const cardinalNum = ["st", "nd", "rd"];
  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  useEffect(() => {
    if (playlist.length == 0) {
      setCurIndex(0);
      setRandom(0);
    }
  }, [playlist]);

  const getPlaylist = async () => {
    try {
      const response = await axios.get(
        `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/playlist/getPlaylist`
      );
      const temp = response.data.data.playlist;
      console.log(temp);
      setPlaylist(temp);
    } catch (err) {
      if (err.response.data.errCode === 112) {
        //   Handle when session expired
        window.location.href =
          window.__RUNTIME_CONFIG__.FRONTEND_URL + "/login";
      }
    }
  };

  // Function to get ID from a youtube URL
  const youtube_parser = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  // Function to get duration
  const duration_parser = (time) => {
    var regExp = /\d+/g;
    var match = time.match(regExp);
    let hour = 0,
      min = 0,
      sec = 0;
    if (match.length === 1) {
      sec = match[0];
    }
    if (match.length === 2) {
      sec = match[1];
      min = match[0];
    }
    if (match.length === 3) {
      sec = match[2];
      min = match[1];
      hour = match[0];
    }
    const duration = {
      hour: hour,
      min: min,
      sec: sec,
    };
    return duration;
  };

  // Cut down the song title
  const title_parser = (title) => {
    if (title.length > 60) {
      title = title.slice(0, 60);
      return title + "...";
    }
    return title;
  };

  // Get data from API
  const getData = (link) => {
    const id = youtube_parser(link);
    const url =
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" +
      id +
      `&key=${window.__RUNTIME_CONFIG__.API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if (
          playlist.find(
            (element) => element.songId === youtube_parser(link)
          ) === undefined
        ) {
          // Check if a track existed or not
          const newSong = {
            song: {
              songTitle: title_parser(response.items[0].snippet.title),
              songChannelTitle: title_parser(
                response.items[0].snippet.channelTitle
              ),
              songUrl: link,
              songId: youtube_parser(link),
              songDuration: duration_parser(
                response.items[0].contentDetails.duration
              ),
            },
          };
          updatePlaylist(newSong);
          if (curIndex === -1) setCurIndex(playlist.length); // avoid default state
        }
      })
      .catch();
  };

  const updatePlaylist = async (song) => {
    try {
      const response = await axios.put(
        `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/playlist/updatePlaylist`,
        song
      );

      // Handle update playlist
      console.log("Handle update playlist");
      await getPlaylist();
      return response;
    } catch (err) {
      if (err.response.data.errCode === 112) {
        // Handle when session expired
        console.log("Handle when session expired");
      }
      console.log(err.response.data);
    }
  };

  // Show the index of playing track
  useEffect(() => {
    if (curIndex < 0) return;
    var firstTrackAdd = document.getElementsByClassName(`track-0`);
    var newAdd = document.getElementsByClassName(`track-${curIndex}`);
    if (newAdd.length === 0) return;
    newAdd = newAdd[0].offsetTop - firstTrackAdd[0].offsetTop;
    document
      .getElementById("music-player-playlist")
      .scrollTo({ top: newAdd, behavior: "smooth" });
    const curCarNum =
      curIndex % 10 < 3 && (curIndex < 9 || curIndex > 19)
        ? cardinalNum[curIndex % 10]
        : "th";
    console.log("Playing track " + (curIndex + 1) + curCarNum);
  }, [curIndex]);

  // Randomize
  const getRandomNumber = (block) => {
    var temp = Math.floor(Math.random() * playlist.length);
    if (playlist.length === 1) return block;
    while (temp === block) temp = Math.floor(Math.random() * playlist.length);
    return temp;
  };

  // Play next
  const playNext = () => {
    if (random === 0) return curIndex + 1 >= playlist.length ? 0 : curIndex + 1;
    return getRandomNumber(curIndex);
  };

  const deleteSong = async (id) => {
    try {
      const response = await axios.delete(
        `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/playlist/deleteSong/${id}`
      );
      await getPlaylist();
    } catch (err) {
      if (err.response.data.errCode === 112) {
        // Handle when session expired
        console.log("Handle when session expired");
      } else if (err.response.data.errCode === 120) {
        // Handle when task index empty
        console.log("Handle when task index empty");
      } else if (err.response.data.errCode === 121) {
        // Handle when task index not existed
        console.log("Handle when task index not existed");
      }

      console.log(err.response.data);
    }
  };

  // Delete song from playlist
  const handleDeleteSong = (id, index) => {
    youtubeURL.current = undefined;
    deleteSong(id);
    if (index < curIndex) setCurIndex((curIndex) => curIndex - 1);
    else if (index === curIndex)
      setCurIndex((curIndex) =>
        curIndex === playlist.length - 1
          ? curIndex - 1 >= 0
            ? curIndex - 1
            : 0
          : curIndex
      );
  };

  return (
    <div id="music-player">
      {/* Input field */}
      <div id="music-player-display">
        {playlist.length === 0 ? (
          <div id="music-player-current-track-placeholder">
            Pumidoro Music Player
          </div>
        ) : (
          <div id="music-player-current-track">
            <YouTube
              videoId={playlist[curIndex].songId}
              opts={opts}
              onStateChange={(e) => {
                if (e.data == 0) {
                  setCurIndex(playNext());
                }
              }}
            />
          </div>
        )}
        <div id="music-player-right">
          <div id="music-player-input">
            <input
              id="music-player-input-url"
              type="text"
              placeholder='Enter a YouTube URL here, press "Add" and enjoy!'
              onChange={(e) => (youtubeURL.current = e.target.value)}
            />
            <input
              id="music-player-input-button"
              type="button"
              value="Add"
              onClick={() => {
                document.getElementById("music-player-input-url").value = "";
                getData(youtubeURL.current);
              }}
            />
          </div>
          <div id="music-player-button-container">
            <div className="music-player-button-disabled">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-repeat"
                viewBox="0 0 16 16"
                style={{ transform: "translateY(2.5px)" }}
              >
                <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
              </svg>
            </div>
            <div className="music-player-button-disabled-message-box">
              This function is now unavailable. Use the "Loop" option that
              appears when you right-click the player to loop a track.
              <div className="music-player-button-disabled-message-box-arrow"></div>
            </div>
            <div
              className={`music-player-button${random === 1 ? "-active" : ""}`}
              onClick={() => {
                if (playlist.length === 0)
                  alert("ERROR: Playlist empty. Cannot turn on random mode.");
                else setRandom(1 - random);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-shuffle"
                viewBox="0 0 16 16"
                style={{ transform: "translateY(2.5px)" }}
              >
                <path
                  fill-rule="evenodd"
                  d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
                />
                <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
              </svg>
            </div>
            <div
              className="music-player-button"
              onClick={() => {
                if (curIndex + 1 >= playlist.length)
                  alert("ERROR: End of playlist!");
                else setCurIndex(curIndex + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-skip-forward"
                viewBox="0 0 16 16"
                style={{ transform: "translateY(2.5px)" }}
              >
                <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z" />
              </svg>
            </div>
          </div>
          <div id="music-player-playlist">
            {playlist.map((track, index) => (
              <li
                id={`music-player-track${
                  playlist.length > 0
                    ? index == curIndex
                      ? "-active"
                      : ""
                    : ""
                }`}
                key={index}
                className={`track-${index}`}
              >
                <div id="music-player-track-flex">
                  <div
                    id="music-player-track-title"
                    onClick={() => {
                      setCurIndex(index);
                    }}
                  >
                    {track.songTitle}
                  </div>
                  <svg
                    id="music-player-close-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-x-square-fill"
                    viewBox="0 0 16 16"
                    onClick={(e) => handleDeleteSong(track.songId, index)}
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                  </svg>
                </div>
                <div id="music-player-info">
                  <div id="music-player-track-channel">
                    {track.songChannelTitle}
                  </div>
                  <div id="music-player-duration">
                    {(track.songDuration.hour != 0
                      ? track.songDuration.hour < 10
                        ? "0" + track.songDuration.hour + ":"
                        : track.songDuration.hour + ":"
                      : "") +
                      (track.songDuration.min != 0 ||
                      track.songDuration.hour != 0
                        ? track.songDuration.min < 10
                          ? "0" + track.songDuration.min + ":"
                          : track.songDuration.min + ":"
                        : "") +
                      (track.songDuration.sec != 0 ||
                      track.songDuration.min != 0 ||
                      track.songDuration.hour != 0
                        ? track.songDuration.sec < 10
                          ? "0" + track.songDuration.sec
                          : track.songDuration.sec
                        : "")}
                  </div>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MusicPlayer;
