// AboutVideo;

"use client";

import { useState, useRef } from "react";
import styles from "./AboutVideo.module.css";
import Pause from "../../../../public/icons/pause.svg";
import Play from "../../../../public/icons/play.svg";
import LayoutWrapper from "@/components/LayoutWrapper";

const AboutVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <video
            ref={videoRef}
            preload='auto'
            autoPlay
            muted
            loop
            className={styles.video}
          >
            <source src='./video/about.mp4' />
          </video>
          <div className={styles.imgOverlay}></div>
          <div className={styles.contentChildren}></div>

          <button onClick={handlePlayPause} className={styles.playPauseButton}>
            {isPlaying ? (
              <Pause width={25} height={25} />
            ) : (
              <Play width={25} height={25} />
            )}
          </button>
        </div>
        <div className={styles.bottom}>
          <h2 className={styles.heading}>
            Sourced, crafted and designed in Germany
          </h2>
          <p className={styles.copy}>
            From meticulous sourcing of premium materials to the artful design
            process, every step reflects our commitment to delivering an
            exceptional audio experience.
          </p>
        </div>
        <div className={styles.bottomii}>
          <h2 className={styles.headingii}>
            Just as athletes push the boundaries of human potential, were
            dedicated to pushing the boundaries of audio quality, crafting
            headphones that set new standards and ignite your senses.
          </h2>
        </div>
      </LayoutWrapper>
    </section>
  );
};

export default AboutVideo;
