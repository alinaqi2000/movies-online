import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../components/DefaultLayout';
import MoviesList from '../../components/MoviesList';
import ActorsList from '../../components/ActorsList';
import Searching from '../../components/Searching';
import apiHeaders from '../../config/apiHeaders';
import withTransition from '../../HOC/withTransition';
import { Actor } from '../../models/Actor';
import { Movie } from '../../models/Movie';
import styles from '../../styles/App.module.scss';
const SearchMovie = dynamic(() => import('../../components/SearchMovie'), { ssr: false })
function Search() {

    const [movies, setMovies] = useState<Movie[]>([])
    const [actors, setActors] = useState<Actor[]>([])
    const [loading, setLoading] = useState(true)
    const [searchedValue, setSearchedValue] = useState("")
    const router = useRouter()

    const { search } = router.query

    useEffect(() => {
        const val = search?.toString().replaceAll("-", " ") as string
        setSearchedValue(val)
        if (search) {
            searchMovies();
        }
    }, [search])

    const searchMovies = async () => {
        setLoading(true)
        const { titles, names }: { titles: Movie[], names: Actor[] } = await axios.get<{ titles: Movie[] }>('https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/' + search, apiHeaders).then((resp: any) => resp.data);
        setMovies(titles)
        setActors(names || [])
        setLoading(false)
    }
    return (
        <DefaultLayout>
            <Head>
                <title>{searchedValue ? "Results for " + searchedValue : "Searching..."}</title>
                <meta name="description" content="Search the upcoming movies online" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SearchMovie value={searchedValue} />
            {loading ? <Searching /> : <>
                <div className={styles.pageContent}>
                    <div className={styles.content}>
                        <MoviesList movies={movies} />
                        <ActorsList actors={actors} />
                    </div>
                </div>
            </>}

        </DefaultLayout>
    )
}

export default withTransition(Search)
