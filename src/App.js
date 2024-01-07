import "./App.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SwapCallsIcon from "@mui/icons-material/SwapCalls";
import playlist from "./song";
import { Slider, Typography } from "@mui/material";

import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
function App() {
  const [songs, setsongs] = useState(playlist);
  const randomnum = Math.floor(Math.random() * songs.length);
  const [currentsong, setcurrentsong] = useState(randomnum);
  const [image, setimage] = useState(songs[currentsong].artwork);
  const [title, settitle] = useState(songs[currentsong].title);
  const [artist, setartist] = useState(songs[currentsong].artist);
  const [songProgress, setsongProgress] = useState(0);
  const [playing, setplaying] = useState(false);
  const audioPlayer = useRef(new Audio());

  useEffect(() => {
    audioPlayer.current.src = songs[currentsong].url;
    if (playing) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
    setimage(songs[currentsong].artwork);
    setartist(songs[currentsong].artist);
    settitle(songs[currentsong].title);
  }, [currentsong]);

  const playsong = () => {
    if (!playing) {
      audioPlayer.current.play();
      console.log(audioPlayer.current.duration);
    } else {
      audioPlayer.current.pause();
    }
    setplaying(!playing);
  };

  const prevsong = () => {
    if (currentsong <= 0) {
      setcurrentsong(songs.length - 1);
    } else {
      setcurrentsong(currentsong - 1);
    }
  };

  const nextsong = () => {
    currentsong >= songs.length - 1
      ? setcurrentsong(0)
      : setcurrentsong(currentsong + 1);
  };

  const handleSongProgressChange = (e) => {
    setsongProgress(e.target.value);
    audioPlayer.current.currentTime = e.target.value;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (audioPlayer.current.currentTime > 0 && playing) {
        setsongProgress(audioPlayer.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [playing, audioPlayer.current]);

  return (
    <div className="wrapper">
      <Box className="  Music Player">
        <img src={image} alt="" />
        <Slider
          Value={songProgress}
          max={audioPlayer.current.duration}
          min={0}
          color="secondary"
          onChange={handleSongProgressChange}
        />
        <Typography class="title">{title}</Typography>
        <Typography className="artist">{artist}</Typography>
        <Box className=" Music Buttons-Section">
          {/* <Button
            onClick={() =>
              setcurrentsong(Math.floor(Math.random() * songs.length))
            }
          >
            <SwapCallsIcon />
          </Button> */}
          <Button variant="text">
            <ArrowLeftIcon onClick={prevsong} />
          </Button>
          {playing ? (
            <Button className="play">
              <PauseIcon onClick={playsong} />
            </Button>
          ) : (
            <Button className="play">
              <PlayArrowIcon onClick={playsong} />
            </Button>
          )}
          <Button>
            <ArrowRightIcon onClick={nextsong} />
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default App;
