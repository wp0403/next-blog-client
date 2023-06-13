/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-06-13 15:50:27
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-13 17:28:09
 */
import React, { useEffect, useRef, useState } from "react";
import { useUpdate } from "ahooks";
import { bindHandleScroll, removeScroll } from "@/utils/elementUtils";
import style from "./virtuallyItem.module.css";

const VirtuallyItem = (props) => {
  const update = useUpdate();
  // 用于记录当前元素的高度
  const itemHeight = useRef<number | null>(null);
  // 用户保存当前的元素
  const item = useRef<any>(null);
  // 判断当前元素是否在可视窗口
  const [isVisual, setIsVisual] = useState<boolean>(true);

  const scrollCallback = () => {
    // get position relative to viewport
    const rect = item.current?.getBoundingClientRect();
    const distanceFromTop = rect.top;
    const distanceFromBottom = rect.bottom;
    // 可视区域高度
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    if (
      (distanceFromTop > -200 && distanceFromTop < viewportHeight + 200) ||
      (distanceFromBottom > -200 && distanceFromBottom < viewportHeight + 200)
    ) {
      setIsVisual(true);
    } else {
      setIsVisual(false);
    }
  };

  const windowResize = () => {
    itemHeight.current = null;
    update();
  };

  useEffect(() => {
    bindHandleScroll(scrollCallback);
    window.addEventListener("resize", windowResize);

    return () => {
      removeScroll(scrollCallback);
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  useEffect(() => {
    if (item.current && itemHeight.current !== item.current?.offsetHeight) {
      itemHeight.current = item.current?.offsetHeight;
    }
  }, [item.current, isVisual]);

  return (
    <div
      className={style.virtually_item}
      ref={item}
      style={{
        height: `${itemHeight.current ? `${itemHeight.current}px` : "auto"}`,
      }}
    >
      {isVisual && props.children}
    </div>
  );
};

export default VirtuallyItem;
