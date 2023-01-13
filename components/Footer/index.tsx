/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-12-15 02:49:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-01-13 18:22:07
 */
import style from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.other_websites}>
        <div className={style.title}>其他网站</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
      </div>
      <div className={style.contact}>
        <div className={style.title}>联系我</div>
        <div className={style.link}>qq</div>
        <div className={style.link}>微信</div>
        <div className={style.link}>知乎</div>
        <div className={style.link}>掘金</div>
        <div className={style.link}>邮箱</div>
      </div>
      <div className={style.other_websites}>
        <div className={style.title}>其他网站</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
      </div>
      <div className={style.copyright}>
        <div className={style.user}>
          © {new Date().getFullYear()} 于风里读诗
        </div>
        <div className={style.legalText}>
          <div className={style.link}>版权声明</div>
          <div className={style.link}>域名备案</div>
          <div className={style.link}>公安备案</div>
        </div>
      </div>
    </footer>
  );
}
