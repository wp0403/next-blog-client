/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-25 13:26:14
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-05-25 13:45:43
 */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
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
