import React, { useState } from 'react'
import { Movie } from '../models/Movie'
import MovieCard from './MovieCard'
import styles from '../styles/Movie.module.scss';
import { AnimateSharedLayout, motion } from 'framer-motion';
import MovieDetail from './MovieDetailTap';

export default function MoviesList({ movies }: { movies: Movie[] }) {
    const [selectedId, setSelectedId] = useState('')
    const [tapped, setTapped] = useState(true)
    const setMovie = (id: string) => {
        if (id == selectedId) {            
            setTapped(!tapped)
        }
        setSelectedId(id)
    }
    return (
        <AnimateSharedLayout type="crossfade">
            {movies.length ? <>
                <h5 className={styles.secTitle}>Movies</h5>
                <div className={styles.moviesList}>
                    {movies.map((movie) => <MovieCard {...movie} key={movie.id} selectMovie={() => setMovie(movie.id)} />)}
                </div>
            </> : (<div className={styles.noMovies}>
                <motion.img src="../no-data.svg" />
                <h4>No Ddata found</h4>

            </div>)
            }
            <MovieDetail id={selectedId} tapped={tapped} setSelect={(str) => setSelectedId(str)} />
        </AnimateSharedLayout >
    )
}
