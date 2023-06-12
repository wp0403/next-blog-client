/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-06-08 14:33:20
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-08 17:39:47
 */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import bgImg from "@/public/images/bg00001.jpg";
import shimmerGif from "@/public/images/shimmer.gif";
import style from "./loadingcom.module.css";

const LoadingCom = () => {
  return (
    <div className={style.loading_com}>
      <Image
        className={style.loading_com_bg}
        src={bgImg}
        alt="loading"
        width={1000}
        height={1000}
      />
      <div className={style.text_box}>
        <div></div>
        <div className={style.text}>Shimmer</div>
      </div>
    </div>
  );
};

export default LoadingCom;