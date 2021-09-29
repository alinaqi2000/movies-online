import React from 'react'
import styles from '../styles/App.module.scss'
import { motion } from "framer-motion"
import { ToastContainer } from 'react-toastify';


export default function DefaultLayout({ children }: { children: JSX.Element | JSX.Element[] }) {
    const transition = {
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeatDelay: 1,
        delay: 1,
    };

    const animation = {
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 360, 360, 0],
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <header className={styles.header}>
                <h4><span>Search </span>
                    <motion.div
                        transition={transition}
                        animate={animation}
                        drag
                        dragConstraints={{
                            top: -0,
                            right: 0,
                            bottom: 0,
                            left: -0,
                        }}
                        whileTap={{ cursor: "grabbing" }}>
                        Movies
                    </motion.div >
                    <span> Online</span></h4>
            </header>
            <main className={styles.main}>
                {children}
            </main>

            <footer className={styles.footer}>

            </footer>
        </div >
    )
}
