import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import apiHeaders from '../config/apiHeaders'
import { Film } from '../models/Film'
import Fetching from './Fetching'
import styles from '../styles/Movie.module.scss';
import { AiFillStar } from "react-icons/ai";
import { AnimatePresence, motion } from 'framer-motion'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function MovieDetail({ id, setSelect }: { id: string, setSelect: (str: string) => void }) {
    const [film, setFilm] = useState<Film | null>(null)
    const [loading, setLoading] = useState(true)
    let showPoster = false
    const { height, width } = useWindowDimensions();

    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 1, y: height },
        exit: { opacity: 1, y: height },
    }

    useEffect(() => {
        if (id) {
            getFilm();
        }
    }, [id])
    const getFilm = async () => {
        setLoading(true)
        const filmData = await axios.get<Film>('https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/' + id, apiHeaders).then((resp: { data: Film }) => resp.data);
        setFilm(filmData)
        setLoading(false)
    }
    const setPosterHeight = (e: any) => {
        if (showPoster) {
            e.target.style.cssText += 'max-height: 30vh;'
            showPoster = false
        } else {
            var image = new Image();
            image.src = film?.poster || "";
            image.onload = function () {
                const newH = (width * image.height) / image.width;
                e.target.style.cssText += 'max-height:' + newH + 'px;'
            };
            showPoster = true
        }
    }
    return <>

        <AnimatePresence >
            {id && (
                <motion.div className={styles.movieDetail} layoutId={id}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={variants}
                    dragTransition={{ bounceDamping: 10 }}
                    drag="y"
                    onDragEnd={(e, i) => {
                        if ((i.point.y > (height - 50)) && (i.point.y + i.velocity.y) > (height + 250)) {
                            setSelect("")
                        }
                    }}
                    dragConstraints={{
                        top: 0,
                        bottom: height - 50,
                    }}
                >
                    <motion.div className={styles.dragBottom}>
                        <motion.span></motion.span>
                    </motion.div>
                    {
                        loading ? <Fetching /> :
                            film?.title ? (<div className={styles.film}>
                                {/* <div onClick={() => setSelect("")} className={styles.filmActions}>
        <FiX />
    </div> */}
                                <motion.figure className={styles.filmPoster}>
                                    <motion.div
                                        onClick={setPosterHeight}
                                        className={styles.filmImageClose}
                                        style={{
                                            background: `url('${film?.poster}')`,
                                            height: "100vh",
                                            maxHeight: '30vh'
                                        }} />

                                </motion.figure>
                                <div className={styles.filmContent}>
                                    <h4>{film?.title}</h4>
                                    <p>{film?.plot}</p>
                                    <div className={styles.filmInfo}>
                                        <div className={styles.filmInfoItem}>
                                            <span className={styles.filmMainText}>{film?.rating}
                                                <AiFillStar />
                                            </span>
                                            <span className={styles.filmSubText}>Rating</span>
                                        </div>
                                        <div className={styles.filmInfoItem}>
                                            <span className={styles.filmMainText}>{film?.year}</span>
                                            <span className={styles.filmSubText}>Released</span>
                                        </div>
                                        <div className={styles.filmInfoItem}>
                                            <span className={styles.filmMainText}>{film?.length}</span>
                                            <span className={styles.filmSubText}>Length</span>
                                        </div>
                                    </div>
                                    <div className={styles.filmCast}>
                                        <h5>Cast</h5>
                                        <ul>
                                            {film?.cast.length ?
                                                film?.cast.map((actor) => (
                                                    <li key={actor.actor_id}>
                                                        {actor.actor}
                                                        <span>- {actor.character}</span>
                                                    </li>
                                                )
                                                ) :
                                                <li>Cast not available</li>
                                            }
                                            <li>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>) :
                                (
                                    <div className={styles.noData}>

                                        <h4>No data available</h4>
                                    </div>
                                )

                    }
                </motion.div>)
            }
        </AnimatePresence>

    </>

}
