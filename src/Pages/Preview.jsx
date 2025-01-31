import React, { useState, useEffect, useRef } from "react";
const Preview = ({ filter }) => {
  const [videoData, setVideoData] = useState([]); 
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState("00:00:00"); 
  const videoRef = useRef(null); 
  const nextVideoRef = useRef(null); 
  const currentVideo = videoData[currentVideoIndex];
  // useEffect(() => {
  //   fetchVideos();
  // }, []);

  useEffect(() => {
    fetchVideos();
  }, [filter]);

 
  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://server2-getfromdatabase.onrender.com/find?fromdate=${filter?.fromDate}&todate=${filter?.toDate}&fromtime=${filter?.fromTime}&totime=${filter?.toTime||"23:00:00"}&divisename=${filter?.selectedDevice}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      const data = await response.json();

    
      const sortedData = data.sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a.fromtime}Z`).getTime();
        const timeB = new Date(`1970-01-01T${b.fromtime}Z`).getTime();
        return timeA - timeB; 
      });

      setVideoData(sortedData); 
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause(); 
    } else {
      videoRef.current.play(); 
    }
    setIsPlaying(!isPlaying); 
  };

  const handleSliderChange = (e) => {
    // fetchVideos();
    const newIndex = Number(e.target.value);
    
    setCurrentVideoIndex(newIndex);
    
    setIsPlaying(true);
  };

  const handleVideoEnd = () => {
    if (currentVideoIndex < videoData.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setCurrentVideoIndex(0);
    }
    setIsPlaying(true); 
  };

  const updateCurrentTime = () => {
    const time = videoRef.current.currentTime;
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    setCurrentTime(`${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
    if (videoData.length > 0 && currentVideoIndex < videoData.length - 1) {
      nextVideoRef.current = new Audio(videoData[currentVideoIndex + 1]?.url); // Use optional chaining
    }
  }, [currentVideoIndex, videoData]);

  useEffect(() => {
    if (videoData.length > 0 && currentVideoIndex < videoData.length - 2) {
      nextVideoRef.current = new Audio(videoData[currentVideoIndex + 2]?.url); // Use optional chaining
    }
  }, [currentVideoIndex, videoData]);

  if (loading) return(
    <>
    <img src="/retriving.gif"/>
    </>
  );
  if (error) return <p>Error: {error}</p>;

 

  return (
    <div>
      {videoData.length > 0 ? (
        <div>
          <h3>
            Playing Video: {currentVideo?.filename} ({currentVideo?.fromtime} -{" "}
            {currentVideo.totime})
          </h3>

          {/* Custom Video Player */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <video
              ref={videoRef}
              src={currentVideo.url}
              onEnded={handleVideoEnd}
              autoPlay
              onTimeUpdate={updateCurrentTime} 
              style={{ width: "640px", height: "360px" }}
              preload="auto"
            />


            <div style={{ display: "flix" }}>
              <button
                onClick={togglePlayPause}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>{" "}
              {"  "}
              
            </div>
          </div>

          <div
            style={{ marginTop: "20px", width: "100%", textAlign: "center" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{currentVideo.fromtime}</span>
              <span>{videoData[videoData.length - 1].totime}</span>
            </div>
            <input
              type="range"
              min="0"
              max={videoData.length - 1}
              value={currentVideoIndex}
              onChange={handleSliderChange}
              style={{ width: "100%" }}
            />
            <p>
              Current Video: {currentVideoIndex + 1} of {videoData.length}
            </p>
          </div>

          <div style={{ marginTop: "10px" }}>
            <p>
              Current Playback Time: <strong>{currentTime}</strong>
            </p>
          </div>
        </div>
      ) : (
      <p>No Vidios for today </p>
      )}
    </div>
  );
};

export default Preview;
