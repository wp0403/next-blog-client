/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-03-20 17:29:22
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-22 18:15:28
 */
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "../../utils/elementUtils";
import aboutImg from "/public/about_3.jpg";
import style from "./about.module.css";

const About = () => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);
  return (
    <div className={style.about}>
      <div className={style.about_content}>
        <div className={style.title}>About</div>
        <Image
          className={style.about_img}
          width={850}
          alt="about"
          src={aboutImg}
        />
        <div className={style.title}>Me</div>
        <div className={style.info}>
          Hi！我是Shimmer🌈，在北京工作，目前从事Web前端工程师。
        </div>
        <div className={style.title}>关于Blog</div>
        <div className={style.desc}>
          Blog至今已有三个不同的版本，历经纯HTML、React到如今的NextJS，写blog的目的在于扩展视野，累积文章，以及记录生活，目前已有对应的后管系统，希望未来能够走得更远。
        </div>
        <div className={style.title}>Contact</div>
        <div className={style.contact}>
          <div className={style.contact_item}>
            <div className={style.contact_item_key}>Email:</div>
            <div className={style.contact_item_value}>webwp0403@163.com</div>
          </div>
          <div className={style.contact_item}>
            <div className={style.contact_item_key}>微信:</div>
            <div className={style.contact_item_value}>wp0403-</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;