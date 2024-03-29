/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-04-10 13:56:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-10-17 17:26:11
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
  const backgroundColor = useRef<string>(getRandomColor());
  const [src, setSrc] = useState<string>();
  const [inViewport] = useInViewport(ref);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isAntdLoad, setIsAntdLoad] = useState<boolean>(false);
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    inViewport && !src && !isLoad && setSrc(imgSrc);
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
            className={`${className} ${style.photography_image}`}
            width={width as any}
            height={width as any}
            alt=""
            onLoad={() => {
              !isLoad && setIsLoad(true);
            }}
            src={src}
            quality={100}
            {...reset}
          />
          {isLoad && (
            <AntImage
              className={`${className} ${style.photography_image_antd}`}
              width={width as any}
              height={width as any}
              onLoad={() => {
                setIsAntdLoad(true);
              }}
              preview={isAntdLoad}
              alt=""
              src={src}
              rootClassName={`${className}`}
            />
          )}
        </>
      )}
      {!isLoad && (
        <div
          className={`${className} ${style.photography_image_div} ${
            src && style.photography_image_pa
          }`}
          style={
            isBrowser
              ? {
                  backgroundColor: backgroundColor.current,
                  width: width,
                  height: width,
                }
              : {}
          }
        />
      )}
    </span>
  );
};

export default LazyCom;
