import React from 'react'
import styles from '../styles/App.module.scss'
import LoadingIcon from '../public/loading.svg';

export default function Fetching() {
    return (
        <div className={styles.loading}>
            <LoadingIcon />
        </div>
    )
}
