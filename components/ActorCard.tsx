import { motion, useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import styles from '../styles/Movie.module.scss';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { Actor } from '../models/Actor';

export default function ActorCard(actor: Actor) {
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
            className={styles.actorCard}
            whileTap={{ cursor: "grabbing" }}
            animate={animation}
            style={{ width: 100, height: ((100) * 1600) / 1080 }}
        >
            <motion.figure>
                <motion.div style={{ background: `url('${actor.image}')`, width: 100, height: ((100) * 1600) / 1080 }} />
            </motion.figure>
            <motion.h4>{actor.title}</motion.h4>
        </motion.div>
    )
}
