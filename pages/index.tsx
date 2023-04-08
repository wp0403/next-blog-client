import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { bindHandleScroll, removeScroll } from "../utils/elementUtils";
import { scrollTo } from "../utils/element";
import SysIcon from "../components/SysIcon";
import bgImg from "/public/bg00003.jpg";
import styles from "../styles/home.module.css";

const str = '「Shimmer🌈」\n从事web前端开发\n喜欢探索学习\n摄影、玩、玩、玩'

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
        <div className={styles.bg_card}>
          <Image className={styles.bg_card_img} width={1200} src={bgImg} alt='' priority />
        </div>
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
        {/* <div className={styles.about} ref={aboutDom}>
          <div className={styles.about_title}>关于我</div>
          <div className={styles.about_tags}>
            <span>程序员</span>
            <span>程序员</span>
            <span>程序员</span>
            <span>程序员</span>
          </div>
          <div className={styles.about_description} dangerouslySetInnerHTML={{__html: str,}}>
            
          </div>
        </div> */}
      </div>
    </>
  );
}
