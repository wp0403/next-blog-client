/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-25 13:26:14
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-09-01 13:58:39
 */
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Script
          charSet="UTF-8"
          id="LA_COLLECT"
          src="//sdk.51.la/js-sdk-pro.min.js"
        ></Script>
        <Script>
          {`
              LA.init({
                id:"3FmNQHwzFUzdFjX3",
                ck:"3FmNQHwzFUzdFjX3",
                autoTrack:true,
                hashMode:true
              })
          `}
        </Script>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
