"use client";

/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-12-15 02:49:22
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-01-25 15:25:49
 */
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getLayoutDom } from "../../utils/elementUtils";
import SysIcon from "../SysIcon";
import { navList } from "./routes";
import styles from "./navBar.module.css";

export default function Navbar() {
  // 导航item
  const navItem = (obj) => (
    <Link
      className={styles.nav_item}
      id="nav_item"
      href={obj?.href}
      key={obj?.key}
    >
      <SysIcon className={styles.nav_item_icon} type={obj?.icon} />
      <span className={styles.nav_item_title}>{obj?.title}</span>
    </Link>
  );

  // 主题
  const [theme, setTheme] = useState<any>(1);
  // 是否弹出遮罩
  const [avtive, setActive] = useState<boolean>(false);

  // 切换主题
  const themeSwitch = () => {
    document.documentElement.classList.toggle("dark");
    setTheme(theme === 1 ? 2 : 1);
  };

  // 绑定全局滚动事件
  useEffect(() => {
    getLayoutDom();
  }, []);

  return (
    <>
      <nav className={styles.nav} id="layout_nav">
        <div className={styles.nav_left}>
          <h1>
            <Image
              src={theme === 1 ? "/weiguang.png" : "/weiguang_bai.png"}
              alt="于风里读诗"
              width={100}
              height={40}
            />
          </h1>
          <h2 className={styles.title} id="nav_item">
            于风里读诗
          </h2>
        </div>
        <div className={styles.nav_right}>
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
        <div className={styles.nav_mobile}>
          <div
            className={styles.nav_mobile_btn}
            id="nav_item"
            onClick={() => setActive(!avtive)}
          >
            <SysIcon type="icon-daohang" />
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
          className={styles.nav_mobile_btn}
          onClick={() => setActive(!avtive)}
        >
          <SysIcon type="icon-daohang" />
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
