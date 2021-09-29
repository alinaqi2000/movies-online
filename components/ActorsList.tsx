import React, { useState } from 'react'
import { Movie } from '../models/Movie'
import ActorCard from './ActorCard'
import styles from '../styles/Movie.module.scss';
import { AnimateSharedLayout } from 'framer-motion';

export default function MoviesList({ actors }: { actors: Movie[] }) {

    return (
        <AnimateSharedLayout type="crossfade">
            {actors.length ? <>
                <h5 className={styles.secTitle}>Popular</h5>
                <div className={styles.actorsList}>
                    {actors.map((actor) => <ActorCard {...actor} key={actor.id} />)}
                </div>
            </>
                : ('')
            }
        </AnimateSharedLayout >
    )
}
