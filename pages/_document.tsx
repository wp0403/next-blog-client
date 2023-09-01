/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-25 13:26:14
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-09-01 14:30:42
 */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
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
