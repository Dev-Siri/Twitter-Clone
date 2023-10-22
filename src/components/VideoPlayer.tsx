"use client";
import { useEffect, useMemo, useRef, useState } from "react";

import Muted from "./icons/Muted";
import Paused from "./icons/Paused";
import PictureInPicture from "./icons/PictureInPicture";
import Playing from "./icons/Playing";
import Speaker from "./icons/Speaker";

interface Props {
  url: string;
}

const iconProps = {
  height: 20,
  width: 20,
};

export default function VideoPlayer({ url }: Props) {
  const [durationWatched, setDurationWatched] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current!;

    const updateDuration = () =>
      setDurationWatched(videoRef.current?.currentTime!);

    videoElement.addEventListener("timeupdate", updateDuration);

    return () => {
      videoElement.removeEventListener("timeupdate", updateDuration);
    };
  }, []);

  function handlePlayAndPause() {
    if (isPlaying) {
      videoRef.current?.pause();
      return setIsPlaying(false);
    }

    videoRef.current?.play();
    setIsPlaying(true);
  }

  function togglePictureInPicture() {
    if (document.pictureInPictureElement)
      return document.exitPictureInPicture();

    if (document.pictureInPictureEnabled)
      videoRef.current?.requestPictureInPicture();
  }

  function handleProgressBarClick(event: React.MouseEvent<HTMLDivElement>) {
    const progressBar = event.currentTarget;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const seekTime =
      (clickX / progressBarWidth) * (videoRef.current?.duration ?? 1);

    if (!isNaN(seekTime)) {
      if (videoRef.current) videoRef.current.currentTime = seekTime;
      setDurationWatched(seekTime);
    }
  }

  function handleProgressBarDrag(event: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging) return;

    const progressBar = event.currentTarget;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const seekTime =
      (clickX / progressBarWidth) * (videoRef.current?.duration ?? 1);

    if (!isNaN(seekTime)) {
      if (videoRef.current) videoRef.current.currentTime = seekTime;
      setDurationWatched(seekTime);
    }
  }

  const durationWatchedPercent = useMemo(
    () => (durationWatched / (videoRef.current?.duration ?? 1)) * 100,
    [durationWatched]
  );

  const totalTimeLabel = useMemo(() => {
    const totalTimeRounded = Math.round(videoRef.current?.duration ?? 1);
    return `${Math.floor(totalTimeRounded / 60)}:${totalTimeRounded % 60}`;
  }, []);

  const durationLabel = useMemo(() => {
    const durationWatchedRounded = Math.round(durationWatched);
    return `${Math.floor(durationWatchedRounded / 60)}:${
      durationWatchedRounded % 60
    }`;
  }, [durationWatched]);

  return (
    <div
      id="video-player"
      className="relative"
      onClick={(e) => e.preventDefault()}
      onMouseLeave={() => setIsFocused(false)}
      onMouseEnter={() => setIsFocused(true)}
    >
      <video
        ref={videoRef}
        src={url}
        className="rounded-md duration-200"
        style={{ opacity: isFocused ? 0.6 : 1 }}
        muted={isMuted}
      />
      {isFocused && (
        <div className="flex flex-col items-center w-full absolute top-[84%]">
          <div
            className="group relative cursor-pointer w-[97%]"
            aria-label="Video Progress"
            role="progressbar"
            onClick={handleProgressBarClick}
            onMouseMove={handleProgressBarDrag}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            draggable={false}
          >
            <div
              className="absolute inset-0 h-1 rounded-full bg-white duration-75 group-hover:h-2"
              draggable={false}
              style={{
                width: `${durationWatchedPercent}%`,
              }}
            />
            <div
              className="absolute inset-x-0 -mt-1 h-4 w-4 rounded-full bg-white hidden duration-75 group-hover:block"
              draggable={false}
              style={{
                left: `${durationWatchedPercent - 1}%`,
              }}
            />
            <div className="h-1 inset-0 w-full rounded-full bg-gray-400 duration-75 group-hover:h-2" />
          </div>
          <div className="w-full flex items-center pr-3 self-start mt-2">
            <button
              type="button"
              className="rounded-full p-2 ml-1 duration-200 hover:bg-white hover:bg-opacity-10"
              onClick={handlePlayAndPause}
            >
              {isPlaying ? (
                <Playing {...iconProps} />
              ) : (
                <Paused {...iconProps} />
              )}
            </button>
            <p className="ml-auto">
              {durationLabel} / {totalTimeLabel}
            </p>
            <button
              type="button"
              className="rounded-full p-2 duration-200 hover:bg-white hover:bg-opacity-10"
              onClick={() => setIsMuted((prevIsMuted) => !prevIsMuted)}
            >
              {isMuted ? <Muted {...iconProps} /> : <Speaker {...iconProps} />}
            </button>
            <button
              type="button"
              className="rounded-full p-2 duration-200 hover:bg-white hover:bg-opacity-10"
              onClick={togglePictureInPicture}
            >
              <PictureInPicture {...iconProps} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
