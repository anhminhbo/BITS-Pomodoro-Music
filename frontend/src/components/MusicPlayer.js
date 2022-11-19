import React, { useRef, useState } from "react";

const MusicPlayer = () => {
  const youtubeURL = useRef();
  const [video, setVideo] = useState();

  // Function to get ID from a youtube URL
  const youtube_parser = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  // Get data from API
  const getData = (link) => {
    const id = youtube_parser(link);
    const url =
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" +
      id +
      `&key=${window.__RUNTIME_CONFIG__.API_KEY}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if (response.items.length !== 0) setVideo(response.items[0].snippet);
      })
      .catch();
  };

  return (
    <div>
      {/* Input field */}
      <input
        type="text"
        onChange={(e) => (youtubeURL.current = e.target.value)}
      />
      <input
        type="button"
        value="Add"
        onClick={(e) => getData(youtubeURL.current)}
      />

      {
        // Block the initial state (undefined) of the "video" variable
        video === undefined ? (
          <div />
        ) : (
          <div>
            <iframe
              title="video"
              id="ytplayer"
              type="text/html"
              width="640"
              height="360"
              src={
                "https://www.youtube.com/embed/" +
                youtube_parser(youtubeURL.current) +
                "?autoplay=1"
              }
              frameBorder="0"
            ></iframe>
            <div>{video.title}</div>
            <div>{video.channelTitle}</div>
          </div>
        )
      }
    </div>
  );
};

export default MusicPlayer;
