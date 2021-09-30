import type { NextPage } from 'next'
import Head from 'next/head'
import DefaultLayout from '../components/DefaultLayout'
import withTransition from '../HOC/withTransition'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import styles from '../styles/App.module.scss';
const SearchMovie = dynamic(() => import('../components/SearchMovie'), { ssr: false })


const Home: NextPage = (movies) => {
  console.log(movies);

  return (
    <DefaultLayout>
      <Head>
        <title>Search Movies Online</title>
        <meta name="description" content="Search the upcoming movies online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchMovie value="" />
      <div className={styles.search}>
        <motion.img src="search.svg" />
      </div>


    </DefaultLayout>
  )
}
export default withTransition(Home)
