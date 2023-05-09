/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-08 11:22:08
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-05-09 10:25:28
 */
import React, { useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";

const Audiovisuals = () => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);
  return <div></div>;
};

export default Audiovisuals;
