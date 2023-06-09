/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-12-15 02:49:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-09 19:07:49
 */
import Link from "next/link";
import { useState } from "react";
import { Modal } from "antd";
import style from "./footer.module.css";

const Footer = () => {
  const [copyrightModal, setCopyrightModal] = useState<boolean>(false);
  const [dutyModal, setDutyModal] = useState<boolean>(false);
  return (
    <footer className={style.footer}>
      {/* <div className={style.other_websites}>
        <div className={style.title}>友情链接</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
        <div className={style.link}>网站一</div>
      </div> */}
      <div className={style.other_websites}>
        <div className={style.title}>站内索引</div>
        <Link
          className={style.link}
          target="_blank"
          href="/sitemap.xml"
          passHref
          legacyBehavior
        >
          <a className={`${style.link} ${style.link_click}`} rel="noopener">
            站点地图
          </a>
        </Link>
        <Link
          className={style.link}
          target="_blank"
          href="/rss.xml"
          passHref
          legacyBehavior
        >
          <a className={`${style.link} ${style.link_click}`} rel="noopener">
            RSS订阅
          </a>
        </Link>
        <div
          className={`${style.link} ${style.click}`}
          onClick={() => setDutyModal(true)}
        >
          免责声明
        </div>
      </div>
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
        <div className={style.modal_content}>
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
        </div>
      </Modal>
      <Modal
        className={style.modal}
        title="免责声明"
        open={dutyModal}
        onCancel={() => setDutyModal(false)}
        footer={null}
      >
        <div className={style.modal_content}>
          <div className={style.modal_title}>
            欢迎访问我的个人博客，本站提供的所有信息均在善意和合理的基础上发布和使用，但本人无法保证信息的准确性、完整性和实时性。
          </div>
          <p>
            <div className={style.modal_desc_title}>信息准确性和完整性</div>
            本人尽力确保本站提供的所有信息、内容和资料的准确性、完整性和实时性，但本人无法保证其完全正确、完整和即时更新。本人不能保证所有信息和内容的精确性、可靠性和适用性，因此任何使用本站提供的信息造成的后果和损失由用户自行承担。
          </p>
          <p>
            <div className={style.modal_desc_title}>知识产权</div>
            本人发布的所有信息、内容和资料，包括文字、图片、图形、标识、标志、图表和编程代码等，均受到相关的知识产权法律的保护。未经本人的明确授权，任何人不得使用、复制、传播、更改或销售本人的信息和内容。
          </p>
          <p>
            <div className={style.modal_desc_title}>免责条款</div>
            本人不对因本站内容和服务的误导性或不准确性而导致的任何直接、间接、偶然、特殊或结果性损失负责，并且对于本站上其他网站的链接或外部资源的内容、广告、产品或其他资料不负任何责任。
          </p>
          <p>
            <div className={style.modal_desc_title}>合法性</div>
            本人承诺所有内容都是合法的，并未侵犯他人的知识产权或其他合法权利。对于任何侵权行为或侵犯隐私和安全的行为，本人不负责并保留追究法律责任的权利。
          </p>
          <p>
            <div className={style.modal_desc_title}>变更和更新</div>
            本人保留对本免责声明进行随时变更、更新和修改的权利。本人建议您在访问和使用本人的博客时定期查看本免责声明并了解最新更新。
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
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;
