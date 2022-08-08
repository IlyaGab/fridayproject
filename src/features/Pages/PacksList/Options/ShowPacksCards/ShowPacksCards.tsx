import React, {ReactElement, useEffect, useState} from "react";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {setQueryParamsAC} from "../../packsListReducer";
import styles from "./showPacksCards.module.scss";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";

export const ShowPacksCards = (): ReactElement => {
    const dispatch = useAppDispatch()

    const isMyCardsPack = useAppSelector(state => state.packsList.isMyCardsPack)
    const user_id = useAppSelector(state => state.profileReducer._id)
    const status = useAppSelector(state => state.appReducer.status)

    const [showMyCards, setShowMyCards] = useState<boolean>(isMyCardsPack)

    useEffect(() => {
        if (showMyCards) {
            dispatch(setQueryParamsAC({user_id}))
        } else {
            dispatch(setQueryParamsAC({user_id: ""}))
        }
    }, [dispatch, showMyCards, user_id])


    return (
        <div className={styles.showPacksCards}>
            <h3>
                Show packs cards
            </h3>
            <button className={showMyCards ? `${styles.btn} ${styles.btnActive}` : styles.btn}
                    onClick={() => setShowMyCards(true)}
                    disabled={status === "loading"}
            >My
            </button>
            <button className={!showMyCards ? `${styles.btn} ${styles.btnActive}` : styles.btn}
                    onClick={() => setShowMyCards(false)}
                    disabled={status === "loading"}
            >All
            </button>
        </div>
    )
}