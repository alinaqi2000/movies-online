import React, { useState } from 'react'
import { Movie } from '../models/Movie'
import MovieCard from './MovieCard'
import styles from '../styles/Movie.module.scss';
import { AnimateSharedLayout } from 'framer-motion';
import MovieDetail from './MovieDetailTap';

export default function MoviesList({ movies }: { movies: Movie[] }) {
    const [selectedId, setSelectedId] = useState('')

    return (
        <AnimateSharedLayout type="crossfade">
            {movies.length ? <>
                <h5 className={styles.secTitle}>Movies</h5>
                <div className={styles.moviesList}>
                    {movies.map((movie) => <MovieCard {...movie} key={movie.id} selectMovie={() => setSelectedId(movie.id)} />)}
                </div>
            </> : (<div className={styles.noMovies}>
                <h4>No movies to show</h4>
            </div>)
            }
            <MovieDetail id={selectedId} setSelect={(str) => setSelectedId(str)} />
        </AnimateSharedLayout >
    )
}
