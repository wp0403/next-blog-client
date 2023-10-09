/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-04-10 13:56:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-10-09 12:46:01
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
  const backgroundColor = useRef<string>(getRandomColor());
  const [inViewport] = useInViewport(ref);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    inViewport && !src && setSrc(imgSrc);
  }, [imgSrc, inViewport, src]);
  return (
    <span
      className={`${className} ${style.lazyImg}`}
      ref={ref}
      key={domKey}
      style={{
        width: width,
        height: width,
      }}
    >
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
            quality={100}
            {...reset}
          />
          {isLoad && (
            <AntImage
              className={`${className} ${style.photography_image}`}
              width={width as any}
              height={width as any}
              alt=""
              src={src}
              rootClassName={className}
            />
          )}
        </>
      )}

      {/* 在图片加载完成前只显示占位背景色 */}
      {!isLoad && (
        <div
          className={`${style.photography_image_div}`}
          style={{
            backgroundColor: backgroundColor.current,
            width: width,
            height: width,
          }}
        />
      )}
    </span>
  );
};

export default LazyCom;
