/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-06-08 14:33:20
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-11-09 17:59:19
 */
import React, { useEffect, useRef } from "react";
import style from "./loadingcom.module.css";

const LoadingCom = ({ loading }) => {
  const loadingBox = useRef<any>();
  useEffect(() => {
    loadingBox.current.addEventListener("animationend", () => {
      loadingBox.current.style.display = "none";
    });
  }, []);
  return (
    <div
      className={`${style.preloader_box} ${
        !loading && style.preloader_box_none
      }`}
      ref={loadingBox}
    >
      <div
        className={`${style.preloader_left} ${
          loading ? style.preloader_left_up : style.preloader_left_down
        }`}
      ></div>
      <div
        className={`${style.preloader_right} ${
          loading ? style.preloader_right_up : style.preloader_right_down
        }`}
      ></div>
      <div
        className={`${style.preloader} ${
          loading ? style.preloader_up : style.preloader_down
        }`}
      >
        <span className={style.inner}>S</span>
        <span className={style.inner}>H</span>
        <span className={style.inner}>I</span>
        <span className={style.inner}>M</span>
        <span className={style.inner}>M</span>
        <span className={style.inner}>E</span>
        <span className={style.inner}>R</span>
      </div>
    </div>
  );
};

export default LoadingCom;
