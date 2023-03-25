"use client";

/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-12-15 02:49:22
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-24 14:36:44
 */
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import SysIcon from "../SysIcon";
import { navList } from "./routes";
import styles from "./navBar.module.css";
import { getTheme } from "../../utils/dataUtils";

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
      id={`${current === obj?.href && 'nev_item_active'}`}
      href={obj?.href}
      key={obj?.key}
      onClick={() => setCurrent(obj?.href)}
    >
      <SysIcon className={styles.nav_item_icon} type={obj?.icon} />
      <span className={styles.nav_item_title}>{obj?.title}</span>
    </Link>
  );

  // 切换主题
  const themeSwitch = () => {
    document.documentElement.classList.toggle("dark");
    setTheme(theme === 1 ? 2 : 1);
  };

  useEffect(() => {
    setCurrent(window.location.pathname);

    setTheme(getTheme());
  }, []);

  return (
    <>
      <nav className={styles.nav} id="layout_nav">
        <div className={styles.nav_left}>
          {/* <h1>
            <Image
              src={theme === 1 ? "/weiguang.png" : "/weiguang_bai.png"}
              alt="Shimmer"
              width={100}
              height={40}
            />
          </h1> */}
          <Link className={`${styles.title} nav_item_text`} href="/">
            Shimmer🌈
          </Link>
        </div>
        <div className={styles.nav_right}>
          <div className={styles.nav_list}>
            {navList?.map((v) => navItem(v))}
          </div>
          <div className={styles.nav_type} onClick={themeSwitch}>
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
          <div className={styles.nav_type} onClick={themeSwitch}>
            <SysIcon
              className={`${styles.nav_type_item} ${
                theme === 1 && styles.nav_type_item_active
              }`}
              type="icon-taiyang1"
            />
            <SysIcon
              className={`${styles.nav_type_item} ${
                theme === 2 && styles.nav_type_item_active
              }`}
              type="icon-yueliang1"
            />
          </div>
        </div>
      </div>
    </>
  );
}
