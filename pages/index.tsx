import Head from "next/head";
import Script from "next/script";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { bindHandleScroll, removeScroll } from "../utils/elementUtils";
import { scrollTo } from "../utils/element";
import SysIcon from "../components/SysIcon";
import styles from "../styles/Home.module.css";

const str = '我是「于风里读诗」。 \n当然这肯定不是我的本名啦。\n目前从事的是web前端开发工作。\n在工作之余也会去学习一些新的知识，不断充实自己。\n平时我比较喜欢阅读，或者看一看军事类的新闻，偶尔也会在睡前关注一下行业热点。\n在搞这个小站之前，是在语雀上整理自己的一些学习笔记的。\n当然现在也暂停了这部分的更新（有点偷懒的嫌疑，但确实没有更多精力了）。\n目前在工作之余，大多数时间都在学习或是写一些自己的项目。\n非常羡慕那些有独立开发能力的伙伴们，希望自己也能慢慢茁壮成长（//` 0 `//）。 \n为了能够独立开发一些项目，我也在自学一些后端的东西。\n当然目前还没有太深入（想要尽快开发成果出来）。\n暂时的放弃不代表我会完全抛弃自己的想法。\n自己也在构思着一些小的项目，希望早日提上日程哈。\n我还在努力，期待自己能在此期间得到更多的收获。'

export default function Home() {
  const typeTarget = useRef<any>(null);
  const aboutDom = useRef<any>(null);

  const goAbout = () => {
    const aboutTop = aboutDom.current.offsetTop;

    scrollTo(aboutTop, {
      getContainer: () => document.getElementById("__next") || window,
    });
  };

  useEffect(() => {
    bindHandleScroll();
    const typed = new Typed(typeTarget.current, {
      strings: [
        "年少时，春风得意马蹄疾，不信人间有别离。",
        "收余恨、免娇嗔、且自新、改性情、休恋逝水、苦海回身、早悟兰因。",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      loopCount: Infinity,
      autoInsertCss: true,
      backDelay: 2000,
      showCursor: false,
    });

    return () => {
      removeScroll();
      typed.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <title>首页</title>
        <meta name="description" content="于风里读诗的博客首页" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.home}>
        <div className={styles.bg_card} />
        <div className={styles.bg_mask} id="bg_mask" />
        <div className={styles.bg_content}>
          <div className={styles.title}>世人万千，再难遇我</div>
          <div className={styles.description_box}>
            <div className={styles.description} ref={typeTarget} />
          </div>
          <div className={styles.jiantou}>
            <SysIcon
              className={styles.jiantou_icon}
              type="icon-a-xiajiantouxia"
              onClick={goAbout}
            />
          </div>
        </div>
        <div className={styles.about} ref={aboutDom}>
          <div className={styles.about_title}>关于我</div>
          <div className={styles.about_tags}>
            <span>程序员</span>
            <span>程序员</span>
            <span>程序员</span>
            <span>程序员</span>
          </div>
          <div className={styles.about_description} dangerouslySetInnerHTML={{__html: str,}}>
            
          </div>
        </div>
      </div>
      {/* <Script src="https://api.vvhan.com/api/snow" /> */}
    </>
  );
}
