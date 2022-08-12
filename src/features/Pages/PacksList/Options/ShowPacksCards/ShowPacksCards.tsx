import React, {ReactElement, useEffect} from "react";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {setQueryParamsAC} from "../../packsListReducer";
import styles from "./showPacksCards.module.scss";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";
import {useSearchParams} from "react-router-dom";

export const ShowPacksCards = (): ReactElement => {
    const dispatch = useAppDispatch()

    const user_id = useAppSelector(state => state.profileReducer._id)
    const status = useAppSelector(state => state.appReducer.status)

    const [searchParams, setSearchParams] = useSearchParams()

    const userID = searchParams.get("user_id") || ""

    const handleShowMyCards = () => {
        searchParams.set('user_id', user_id)
        setSearchParams(searchParams)
        dispatch(setQueryParamsAC({user_id}))
    }

    const handleShowAllCards = () => {
        searchParams.set('user_id', "")
        setSearchParams(searchParams)
        dispatch(setQueryParamsAC({user_id: ""}))
    }

    useEffect(()=> {
        dispatch(setQueryParamsAC({user_id: userID}))
    },[dispatch, userID])

    return (
        <div className={styles.showPacksCards}>
            <h3>
                Show packs cards
            </h3>
            <button className={userID ? `${styles.btn} ${styles.btnActive}` : styles.btn}
                    onClick={handleShowMyCards}
                    disabled={status === "loading"}
            >My
            </button>
            <button className={!userID ? `${styles.btn} ${styles.btnActive}` : styles.btn}
                    onClick={handleShowAllCards}
                    disabled={status === "loading"}
            >All
            </button>
        </div>
    )
}