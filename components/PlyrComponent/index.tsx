/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-05 14:19:08
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-05-09 15:39:06
 */
import React, { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import style from "./plyrComponent.module.css";

/**
 * restart: 重新开始按钮。
 * play: 播放按钮。
 * pause: 暂停按钮。
 * rewind: 回退按钮。
 * forward: 前进按钮。
 * progress: 播放进度条。
 * current-time: 播放当前时间。
 * duration: 视频总时长。
 * mute: 静音按钮。
 * volume: 声音控制条。
 * captions: 字幕按钮。
 * settings: 设置菜单按钮。
 * pip: 画中画按钮。
 * airplay: 空中播放按钮。
 * download: 下载视频按钮。
 * fullscreen: 全屏按钮。
 * play-large: 中间的大播放按钮
 */

type Props = {
  video: string;
};

const PlyrComponent = (props: Props) => {
  const { video } = props;
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) return;
    const player = new Plyr(playerRef.current, {
      // 配置项可选
      controls: [
        "restart",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "fullscreen",
        "pip",
        "airplay",
        "progress",
        "download",
        "play-large",
      ],
      autoplay: false,
      captions: { active: true },
      settings: ["default", "quality", "speed"],
      volume: 0.3,
      // clickToPlay: false,
      speed: {
        selected: 1,
        options: [0.5, 1, 2],
      },
    });
  }, [playerRef.current]);

  return (
    <div className={style.plyr}>
      <video ref={playerRef}>
        <source src={video} />
      </video>
    </div>
  );
};

export default PlyrComponent;
