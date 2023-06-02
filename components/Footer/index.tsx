/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-12-15 02:49:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-02 16:52:29
 */
import Link from "next/link";
import { useState } from "react";
import { Modal } from "antd";
import style from "./footer.module.css";

const Footer = () => {
  const [copyrightModal, setCopyrightModal] = useState<boolean>(false);
  return (
    <footer className={style.footer}>
      <div className={style.contact}>
        <div className={style.title}>联系我</div>
        <div className={style.link}>qq: 1818784856</div>
        <div className={style.link}>微信: wp0403-</div>
        <Link
          className={style.link}
          href="mailto:webwp0403@163.com?subject=邮件标题&body=邮件内容"
          target="_blank"
          passHref
          legacyBehavior
        >
          <a className={`${style.link} ${style.link_click}`} rel="nofollow">
            邮箱: webwp0403@163.com
          </a>
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
          <div
            className={`${style.link} ${style.click}`}
            onClick={() => setCopyrightModal(true)}
          >
            版权声明
          </div>
          <Link
            className={style.link}
            target="_blank"
            href="https://beian.miit.gov.cn"
            passHref
            legacyBehavior
          >
            <a className={`${style.link} ${style.link_click}`} rel="nofollow">
              京ICP备2022004838号-1
            </a>
          </Link>
          <div className={style.link}>公安备案</div>
        </div>
      </div>
      <Modal
        className={style.modal}
        title="版权声明"
        open={copyrightModal}
        onCancel={() => setCopyrightModal(false)}
        footer={null}
      >
        <p>
          1、本博客（域名为wp-boke.work）的所有内容（包括但不限于文字、图片、音频、视频等），除特别注明外，其余均由shimmer创作或原创，版权归shimmer个人所有。
        </p>
        <p>
          2、未经本人授权，任何人或机构不得复制、转载、摘编或以任何其他形式使用本站内容。如需转载，请在摘要或正文部分注明出处。
        </p>
        <p>
          3、本博客允许授权使用部分文案，需注明原作者及网址，如用于商业用途，需与原作者确认。任何未授权使用内容的行为都将被视为侵权行为，shimmer保留追究法律责任的权利。
        </p>
        <p>
          4、本站不承担用户因使用本站所提供的服务而产生的任何直接、间接或者连带的责任和赔偿。
        </p>
        <p>
          5、本声明的解释权及修改权归shimmer所有，并保留随时更新网站内容和服务的权利，在不做事先通知的情况下，修改本声明产生效力。
        </p>

        <div className={style.modal_footer}>
          如对本博客版权声明有任何疑问或建议，请联系shimmer的
          <Link
            href="mailto:webwp0403@163.com?subject=邮件标题&body=邮件内容"
            target="_blank"
            passHref
            legacyBehavior
          >
            <a rel="nofollow">电子邮箱</a>
          </Link>
          或通过本博客页面上的相关联系方式进行联系。
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;
