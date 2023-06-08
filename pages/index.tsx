import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { bindHandleScroll, removeScroll } from "@utils/elementUtils";
import { scrollTo } from "@utils/element";
import SysIcon from "@components/SysIcon";
import bgImg from "@/public/images/bg00003.jpg";
import { timeAixsList } from "@/utils/dict";
import styles from "@styles/home.module.css";

export default function Home() {
  const typeTarget = useRef<any>(null);
  const aboutDom = useRef<any>(null);

  const goAbout = () => {
    const aboutTop = aboutDom.current.offsetTop;

    scrollTo(aboutTop, {
      getContainer: () => document.body || window,
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
      </Head>
      <div className={styles.home}>
        <div className={styles.bg_card}>
          <Image
            className={styles.bg_card_img}
            width={1200}
            src={bgImg}
            alt="blog-bg"
            priority={true}
          />
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
        {/* <div className={styles.project_box}>
          <div className={styles.project_title}>BLOG GROWTH RECORD</div>
          <div className={styles.project_desc}>更多的作品</div>
          <div className={styles.project}>

          </div>
        </div> */}
        <div className={styles.timeAixs_box}>
          <div className={styles.timeAixs_title}>GROWTH RECORD</div>
          <div className={styles.timeAixs_desc}>「 左右滑动查看 」</div>
          <div className={styles.timeAixs}>
            <div className={styles.timeAixs_left} />
            <div className={styles.timeAixs_content}>
              {timeAixsList?.map((v) => (
                <div className={styles.timeAixs_item} key={v.id}>
                  <div className={styles.timeAixs_item_time}>{v.time}</div>
                  <div className={styles.timeAixs_item_title}>{v.title}</div>
                </div>
              ))}
              <div className={styles.timeAixs_item}>
                <div className={styles.timeAixs_item_desc}>GROWING...</div>
                <div className={styles.timeAixs_item_desc}>COMING SOON</div>
              </div>
            </div>
            <div className={styles.timeAixs_right} />
          </div>
        </div>
      </div>
    </>
  );
}
