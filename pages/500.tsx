/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-07-26 14:27:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-26 14:27:55
 */
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { addLayoutNavStyle, removeLayoutNavStyle } from "@utils/elementUtils";
import styles from "@styles/error404.module.css";

export default function Custom404() {
  useEffect(() => {
    addLayoutNavStyle();

    return () => {
      removeLayoutNavStyle();
    };
  }, []);

  return (
    <>
      <Head>
        <title>500</title>
      </Head>
      <div className={styles.error_404}>
        <div className={styles.content}>
          <div className={styles.title}>500</div>
          <div className={styles.cn}>
            很抱歉，服务器发生了预期之外的错误，请联系管理员修复。
          </div>
          <div className={styles.en}>
            Sorry, the server encountered an unexpected error. Please contact
            the administrator to fix it.
          </div>
        </div>
        <div className={styles.btn}>
          <Link className={styles.btn_item} href="/">
            回到首页
          </Link>
          <Link
            className={styles.btn_item}
            href="mailto:webwp0403@163.com?subject=邮件标题&amp;body=邮件内容"
            target="_blank"
          >
            联系我
          </Link>
        </div>
      </div>
    </>
  );
}
