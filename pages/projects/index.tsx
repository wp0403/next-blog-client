/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-04-13 17:49:15
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-04-13 18:06:17
 */
import React, { useEffect } from "react";
import Head from "next/head";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "../../utils/elementUtils";
import style from "./index.module.css";

const Projects = () => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);
  return (
    <div className={style.projects}>
      <Head>
        <title>项目</title>
      </Head>
    </div>
  );
};

export default Projects;
