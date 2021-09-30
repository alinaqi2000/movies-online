import { Network } from '@capacitor/network';
import { useRouter } from 'next/dist/client/router'
import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import slugify from 'slugify'
import styles from '../styles/App.module.scss';
export default function SearchMovie({ value }: { value: string }) {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const [cnt, setConnected] = useState(false)
    const inputElement = useRef<HTMLInputElement>(null);

    useEffect(() => {
        checkIfConnected();
        if (inputElement.current !== null && value !== "") {
            setSearch(value);
        }
    }, [value])
    useEffect(() => {
        () => {
            Network.removeAllListeners()
        }
    }, [])
    const checkIfConnected = async () => {
        const { connected } = await Network.getStatus();
        setConnected(connected);
        if (!connected) {
            toast.error("No internet connection found.", { closeButton: false, theme: "colored", position: "bottom-center", autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            Network.addListener('networkStatusChange', status => {
                if (!cnt && status.connectionType !== 'none') {
                    toast.success("Back Online.", { closeButton: false, theme: "colored", position: "bottom-center", autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                    Network.removeAllListeners()
                }
                setConnected(status.connected);
            });
        }
        return connected;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const con = await checkIfConnected()
        if (con) {
            if (!search) {
                return toast.error("Please fill in the search box", { closeButton: false, theme: "colored", position: "bottom-center", autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            }
            router.push("/search/" + slugify(search))
        }
    }
    return (
        <div className={styles.searchBox}>
            <form onSubmit={handleSubmit}>
                <input autoComplete="off" ref={inputElement} type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search movie here" name="search" />
            </form>
        </div>
    )
}
