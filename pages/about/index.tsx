/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-03-20 17:29:22
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-20 17:38:35
 */
import Head from "next/head";
import { useEffect } from "react";
import {
  addLayoutNavStyle,
  removeLayoutNavStyle,
} from "../../utils/elementUtils";
import style from './about.module.css'

const About = () => {
  useEffect(() => {
    addLayoutNavStyle();

    return () => {
      removeLayoutNavStyle();
    };
  }, []);
  return <div className={style.about}>
    <div className={style.title}></div>
    <div className={style.info}></div>
    <div className={style.desc}></div>
    <div className={style.article}></div>
  </div>;
};

export default About;
