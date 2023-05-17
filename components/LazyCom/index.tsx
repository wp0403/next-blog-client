/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-04-10 13:56:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-05-16 11:06:03
 */
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Image as AntImage } from "antd";
import { useInViewport } from "ahooks";
import { getRandomColor } from "@utils/dataUtils";
import style from "./index.module.css";

type Props = {
  imgSrc: string;
  domKey?: number | string;
  width: number | string;
  className?: string;
  reset?: object;
};

const LazyCom = (props: Props) => {
  const { className, imgSrc, domKey, width, reset = {} } = props;
  const ref = useRef(null);
  const [src, setSrc] = useState<string>();
  const [inViewport] = useInViewport(ref);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    inViewport && !src && setSrc(imgSrc);
  }, [imgSrc, inViewport, src]);
  return (
    <span className={style.lazyImg} ref={ref} key={domKey}>
      {src && (
        <>
          <Image
            className={`${className} ${style.photography_image} ${
              !isLoad && style.photography_image_none
            }`}
            width={width as any}
            height={width as any}
            alt=""
            onLoad={() => {
              setIsLoad(true);
            }}
            src={src}
            {...reset}
          />
          <AntImage
            className={`${className} ${style.photography_image_antd}`}
            width={width as any}
            height={width as any}
            alt=""
            src={src}
            rootClassName={`${className} ${
              !isLoad ? style.photography_image_none : ""
            }`}
          />
        </>
      )}
      <div
        className={`${className} ${style.photography_image_div} ${
          isLoad && style.photography_image_none
        }`}
        style={{
          backgroundColor: getRandomColor(),
          width: width,
          height: width,
        }}
      />
    </span>
  );
};

export default LazyCom;
