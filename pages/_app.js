import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';


export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
      <meta charSet="utf-8" />
      <meta name="description" content="UDIPSAI" />
      <title>UDIPSAI</title>
      <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
    </Head>
    <Component {...pageProps} />
  </>
}
