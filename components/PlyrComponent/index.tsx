/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-05 14:19:08
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-05-05 14:20:12
 */
import React, { useEffect, useRef } from "react";
import Plyr from "plyr";

const PlyrComponent = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) return;
    const player = new Plyr(playerRef.current, {
      // 配置项可选
      controls: [
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "fullscreen",
      ],
      autoplay: false,
      captions: { active: false },
    });
  }, [playerRef.current]);

  return (
    <div>
      <video ref={playerRef}>
        <source src="/your-video-url.mp4" />
      </video>
    </div>
  );
};

export default PlyrComponent;
