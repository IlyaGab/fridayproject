import React, {ReactElement, useEffect} from 'react';
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {setIsMyCardsPackAC, setQueryParamsAC} from "../../packsListReducer";
import styles from "./showPacksCards.module.scss";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";
import { useSearchParams} from 'react-router-dom';

export const ShowPacksCards = (): ReactElement => {
    const dispatch = useAppDispatch()

    const isMyCardsPack = useAppSelector(state => state.packsList.isMyCardsPack)
    const user_id = useAppSelector(state => state.profileReducer._id)
    const status = useAppSelector(state => state.appReducer.status)

    const [searchParams, setSearchParams] = useSearchParams()

    const handleShowMyCards = () => {
        searchParams.set('user_id', user_id)
        setSearchParams(searchParams)
        dispatch(setQueryParamsAC({user_id}))
        dispatch(setIsMyCardsPackAC(true))
    }

    const handleShowAllCards = () => {
        searchParams.set('user_id', "")
        setSearchParams(searchParams)
        dispatch(setQueryParamsAC({user_id: ""}))
        dispatch(setIsMyCardsPackAC(false))
    }

    useEffect(()=> {
        if(searchParams.get("user_id") === "") {
            dispatch(setQueryParamsAC({user_id: ""}))
            dispatch(setIsMyCardsPackAC(false))
        } else {
            dispatch(setQueryParamsAC({user_id}))
            dispatch(setIsMyCardsPackAC(true))
        }
    },[dispatch, searchParams, user_id])



    return (
        <div className={styles.showPacksCards}>
            <h3>
                Show packs cards
            </h3>
            <button className={isMyCardsPack ? `${styles.btn} ${styles.btnActive}` : styles.btn}
                    onClick={handleShowMyCards}
                    disabled={status === "loading"}
            >My
            </button>
            <button className={!isMyCardsPack ? `${styles.btn} ${styles.btnActive}` : styles.btn}
                    onClick={handleShowAllCards}
                    disabled={status === "loading"}
            >All
            </button>
        </div>
    )
}