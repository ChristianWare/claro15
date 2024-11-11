'use client'

import { useState, useRef } from "react";
import styles from "./VideoUsp.module.css";
import Pause from "../../../public/icons/pause.svg";
import Play from "../../../public/icons/play.svg";

const VideoUsp = () => {
  const videoRef = useRef<HTMLVideoElement>(null); // Ref to control video
  const [isPlaying, setIsPlaying] = useState(true); // Track play/pause state

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause(); // Pause video
      } else {
        videoRef.current.play(); // Play video
      }
      setIsPlaying(!isPlaying); // Toggle play/pause state
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <video
          ref={videoRef}
          preload='auto'
          autoPlay
          muted
          loop
          className={styles.video}
        >
          <source src='./video/lossless.mp4' />
        </video>
        <div className={styles.imgOverlay}></div>
        <div className={styles.contentChildren}>
          <span className={styles.heading2}>
            Experience world class quality
          </span>
          <h2 className={styles.heading} lang='en'>
            Lossless audio like you&apos;ve <br /> never experienced{" "}
          </h2>
        </div>

        {/* Play/Pause Button */}
        <button onClick={handlePlayPause} className={styles.playPauseButton}>
          {isPlaying ? (
            <Pause width={25} height={25} />
          ) : (
            <Play width={25} height={25} />
          )}
        </button>
      </div>
    </section>
  );
};

export default VideoUsp;
