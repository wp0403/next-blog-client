"use client";

/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-12-15 02:49:22
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-05-05 17:52:23
 */
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import SysIcon from "../SysIcon";
import { navList } from "./routes";
import logo_black from "/public/logo_black.png";
import logo_white from "/public/logo_white.png";
import { handleThemeChange } from "../../utils/dataUtils";
import styles from "./navBar.module.css";

export default function Navbar() {
  const [current, setCurrent] = useState<string>("/");
  // 主题
  const [theme, setTheme] = useState<any>(1);
  // 是否弹出遮罩
  const [avtive, setActive] = useState<boolean>(false);

  // 导航item
  const navItem = (obj) => (
    <Link
      className={`${styles.nav_item} nav_item_text`}
      id={`${current === obj?.href && "nev_item_active"}`}
      href={obj?.href}
      key={obj?.key}
      onClick={() => setCurrent(obj?.href)}
    >
      <SysIcon className={styles.nav_item_icon} type={obj?.icon} />
      <span className={styles.nav_item_title}>{obj?.title}</span>
    </Link>
  );

  // 切换主题
  const themeSwitch = (event) => {
    if (event === "click") {
      document.documentElement.classList.toggle("dark");
      setTheme(theme === 1 ? 2 : 1);
    } else {
      setTheme(handleThemeChange(event));
    }
  };

  useEffect(() => {
    setCurrent(window.location.pathname);
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: light)"
    );

    // 添加一个监听器来监听主题切换
    darkModeMediaQuery.addEventListener("change", themeSwitch);
    themeSwitch(darkModeMediaQuery);

    return () => {
      darkModeMediaQuery.removeEventListener("change", themeSwitch);
    };
  }, []);

  return (
    <>
      <nav className={styles.nav} id="layout_nav">
        <div className={styles.nav_left}>
          <Link className={`${styles.title} nav_item_text`} href="/">
            <Image
              className={styles.logo}
              width={100}
              alt="about"
              src={theme === 2 ? logo_black : logo_white}
              priority
            />
          </Link>
        </div>
        <div className={styles.nav_right}>
          <div className={styles.nav_list}>
            {navList?.map((v) => navItem(v))}
          </div>
          <div className={styles.nav_type} onClick={() => themeSwitch("click")}>
            <SysIcon
              className={`${styles.nav_type_item} ${
                theme === 2 && styles.nav_type_item_active
              }`}
              type="icon-taiyang1"
            />
            <SysIcon
              className={`${styles.nav_type_item} ${
                theme === 1 && styles.nav_type_item_active
              }`}
              type="icon-yueliang1"
            />
          </div>
        </div>
        <div className={styles.nav_mobile}>
          <div
            className={styles.nav_mobile_btn}
            onClick={() => setActive(!avtive)}
          >
            <SysIcon type="icon-tubiao_daohangcaidan" />
          </div>
        </div>
      </nav>
      <div
        className={`${styles.nav_mobile_mask} ${
          avtive && styles.nav_mobile_mask_active
        }`}
        onClick={() => setActive(false)}
      />
      <div
        className={`${styles.nav_mobile_content} ${
          avtive && styles.nav_mobile_content_active
        }`}
      >
        <div
          className={`${styles.nav_mobile_btn}`}
          onClick={() => setActive(!avtive)}
        >
          <SysIcon type="icon-tubiao_daohangcaidan" />
        </div>
        <div className={styles.nav_mobile_list} id="nav_mobile_list">
          <div className={styles.nav_list}>
            {navList?.map((v) => navItem(v))}
          </div>
          <div className={styles.nav_type} onClick={() => themeSwitch("click")}>
            <SysIcon
              className={`${styles.nav_type_item} ${
                theme === 2 && styles.nav_type_item_active
              }`}
              type="icon-taiyang1"
            />
            <SysIcon
              className={`${styles.nav_type_item} ${
                theme === 1 && styles.nav_type_item_active
              }`}
              type="icon-yueliang1"
            />
          </div>
        </div>
      </div>
    </>
  );
}
