import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../components/DefaultLayout';
import Fetching from '../../components/Fetching';
import apiHeaders from '../../config/apiHeaders';
import { Film } from '../../models/Film';

function MovieComp() {
    const [film, setFilm] = useState<Film | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            getFilm();
        }
    }, [id])
    const getFilm = async () => {
        const filmData = await axios.get<Film>('https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/' + id, apiHeaders).then((resp: { data: Film }) => resp.data);
        setFilm(filmData)
        setLoading(false)
    }
    return (
        <DefaultLayout>
            <Head>
                <title>{film?.title || "Loading..."}</title>
                <meta name="description" content={film?.plot} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {
                loading ? <Fetching /> : (
                    <div className="film">
                        <h4>{film?.title}</h4>
                        <p>{film?.plot}</p>
                    </div>
                )
            }
        </DefaultLayout>
    )
}

export default MovieComp;

