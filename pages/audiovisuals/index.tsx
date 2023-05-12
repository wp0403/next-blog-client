/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-08 11:22:08
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-05-11 16:01:04
 */
import React, { useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
// import PlyrComponent from "@components/PlyrComponent";
import MusicComponent from "@components/MusicComponent";
import style from "./audiovisuals.module.css";

const Audiovisuals = () => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);
  return (
    <div className={style.audiovisuals}>
      <MusicComponent
        audio={
          "https://wp-1302605407.cos.ap-beijing.myqcloud.com/mp3/%E6%9C%89%E4%BD%95%E4%B8%8D%E5%8F%AF-%E8%AE%B8%E5%B5%A9.flac"
        }
        lrcUrl={
          "https://wp-1302605407.cos.ap-beijing.myqcloud.com/mp3/%E6%9C%89%E4%BD%95%E4%B8%8D%E5%8F%AF.lrc"
        }
      />
    </div>
  );
};

export default Audiovisuals;
