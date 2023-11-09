/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-05 14:19:08
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-11-08 15:27:17
 */
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import jsmediatags from "jsmediatags";
import { ParsedLyrics, readLyricFile } from "@/utils/dataUtils";
import "plyr/dist/plyr.css";
import style from "./musicComponent.module.css";

type Props = {
  audio: string;
  lrcUrl: string;
  timeErrorValue?: number; // 歌词时间误差值 ms
};

type AudioObj = {
  title: string; // 歌曲名称
  artist: string; // 艺术家
  album: string; // 专辑
  imageUrl: string; // 封面图片
};

const MusicComponent = (props: Props) => {
  const { audio, lrcUrl, timeErrorValue = 100 } = props;
  const audioRef = useRef<any>(null);
  const lrcRef = useRef<any>(null);
  const lrcScrollRef = useRef<any>(null);
  const [audioObj, setAudioObj] = useState<AudioObj>({} as AudioObj);
  const [lyrList, setLyrList] = useState<ParsedLyrics[]>([]);
  const [text, setText] = useState<string>("");
  const [current, setCurrent] = useState<number>();

  useEffect(() => {
    if (!audioRef.current) return;
    jsmediatags.read(audio, {
      onSuccess: function (tag) {
        const imageData = tag.tags.picture;
        if (imageData) {
          const base64Data = btoa(
            String.fromCharCode.apply(null, imageData.data)
          );
          const imageUrl = "data:" + imageData.format + ";base64," + base64Data;
          setAudioObj((v) => ({
            ...v,
            imageUrl,
          }));
        }
        setAudioObj((v: any) => ({
          ...v,
          title: tag.tags.title,
          artist: tag.tags.artist,
          album: tag.tags.album,
        }));
      },
      onError: function (error) {
        console.log(":(", error.type, error.info);
      },
    });

    audioRef.current.addEventListener("timeupdate", (event) => {
      const currentTime = Math.floor(audioRef.current.currentTime * 1000);

      const item = lyrList.findIndex(
        (v) => currentTime + timeErrorValue < v.time
      );

      if (item > 3 && lyrList[item - 1]?.text) {
        setCurrent(item - 1);
        setText(lyrList[item - 1]?.text);

        const currentDom = document.getElementById(`lyr_item${item - 1}`);

        const currentTop = currentDom?.offsetTop || 0;
        const lrcScrollHeight = lrcScrollRef.current.offsetHeight;
        lrcRef.current.scrollTop = 0;
        lrcScrollRef.current.style.transform = `translateY(-${
          currentTop - lrcScrollHeight / 2
        }px)`;
      }
    });
  }, [audioRef.current, lyrList]);

  const getLyr = async () => {
    const res = await readLyricFile(lrcUrl);
    setLyrList(res);
  };

  useEffect(() => {
    if (lrcUrl) getLyr();
  }, [lrcUrl]);

  return (
    <div className={style.musicComponent_pc}>
      <div className={style.info}>
        <div className={style.film_box}>
          <div className={style.film}>
            {audioObj.imageUrl && (
              <Image
                className={style.img}
                src={audioObj.imageUrl}
                alt={audioObj.title}
                width={200}
                height={200}
              />
            )}
            {!audioObj.imageUrl && <div className={style.img} />}
          </div>
        </div>
        <div className={style.audio_info}>
          <div className={style.audio_info_item}>歌曲名：{audioObj.title}</div>
          <div className={style.audio_info_item}>歌手：{audioObj.artist}</div>
          <div className={style.audio_info_item}>专辑：{audioObj.album}</div>
        </div>
        <audio id="audio" ref={audioRef} controls>
          <source src={audio} type="audio/mp3" />
        </audio>
      </div>
      <div className={style.lyr} ref={lrcRef}>
        <div className={style.lyr_scroll} ref={lrcScrollRef}>
          {lyrList?.map((v, ind) => (
            <div
              className={`${style.lyr_item} ${
                current === ind && style.lyr_item_item
              }`}
              id={`lyr_item${ind}`}
              key={ind}
            >
              {v.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicComponent;
