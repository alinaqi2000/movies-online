import React from 'react'
import styles from '../styles/App.module.scss'
import SearchingIcon from '../public/searching.svg';

export default function Searching() {
    return (
        <div className={styles.loading}>
            <SearchingIcon />
        </div>
    )
}
