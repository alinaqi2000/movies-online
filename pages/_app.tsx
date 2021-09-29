import '../styles/globals.scss'
import "nprogress/nprogress.css";
import 'react-toastify/dist/ReactToastify.css';
import dynamic from "next/dynamic";

import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion';

// import Router from 'next/router'
// import NProgress from 'nprogress'
// Router.events.on('routeChangeStart', () => NProgress.start())
// Router.events.on('routeChangeComplete', () => NProgress.done())
// Router.events.on('routeChangeError', () => NProgress.done())

// NProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps, router }: AppProps) {
  return (<AnimatePresence exitBeforeEnter>
    <Component {...pageProps} key={router.route} />
  </AnimatePresence>)
}
export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
