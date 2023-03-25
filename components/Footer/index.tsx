/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-12-15 02:49:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-25 17:14:27
 */
import Link from "next/link";
import style from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.contact}>
        <div className={style.title}>联系我</div>
        <div className={style.link}>qq: 1818784856</div>
        <div className={style.link}>微信: wp0403-</div>
        <Link
          className={style.link}
          href="mailto:webwp0403@163.com?subject=邮件标题&body=邮件内容"
          target='_blank'
        >
          邮箱: webwp0403@163.com
        </Link>
      </div>
      {/* <div className={style.other_websites}>
        <div className={style.title}>其他网站</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
      </div> */}
      <div className={style.copyright}>
        <div className={style.user}>© {new Date().getFullYear()} Shimmer🌈</div>
        <div className={style.legalText}>
          <div className={style.link}>版权声明</div>
          <Link
            className={style.link}
            target="_blank"
            href="https://beian.miit.gov.cn"
          >
            京ICP备2022004838号-1
          </Link>
          <div className={style.link}>公安备案</div>
        </div>
      </div>
    </footer>
  );
}
