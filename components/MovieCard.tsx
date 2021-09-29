import { motion, useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { Movie } from '../models/Movie';
import styles from '../styles/Movie.module.scss';
import Link from 'next/link';
import useWindowDimensions from '../hooks/useWindowDimensions';
interface Props extends Movie {
    selectMovie: () => void
}
export default function MovieCard(movie: Props) {
    const { ref, inView } = useInView();
    const { height, width } = useWindowDimensions();
    const animation = useAnimation()
    const anim = { scale: 1, opacity: 1, transition: { duration: .5, type: "spring", bounce: 0.5 } }
    useEffect(() => {
        if (inView) {
            animation.start({ ...anim })
        } else {
            animation.start({ scale: 0.5, opacity: 0, })
        }
    }, [inView])
    return (
        <motion.div
            ref={ref}
            onClick={movie.selectMovie}
            className={styles.movieCard}
            whileTap={{ cursor: "grabbing" }}
            animate={animation}
            style={{ width: width - 90, height: ((width - 90) * 1600) / 1080 }}
        >
            <motion.figure>
                <motion.div style={{ background: `url('${movie.image}')`, width: width - 90, height: ((width - 90) * 1600) / 1080 }} />
            </motion.figure>
            <motion.h4>{movie.title}</motion.h4>
        </motion.div>
    )
}
