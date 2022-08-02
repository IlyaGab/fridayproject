import React, {ReactElement} from "react";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {getPackListTC, setIsMyCardsPackAC} from "../../packsListReducer";
import styles from "./showPacksCards.module.scss";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";

export const ShowPacksCards = (): ReactElement => {
    const dispatch = useAppDispatch()

    const isMyCardsPack = useAppSelector(state => state.packsList.queryParams.isMyCardsPack)

    const showMyCards = (): void => {
        dispatch(setIsMyCardsPackAC(true))
        dispatch(getPackListTC())
    }

    const showAllCards = (): void => {
        dispatch(setIsMyCardsPackAC(false))
        dispatch(getPackListTC())
    }
    return (
        <div className={styles.showPacksCards}>
            <h3>
                Show packs cards
            </h3>
            <button className={isMyCardsPack ? `${styles.btn} ${styles.btnActive}` : styles.btn} onClick={showMyCards}>My</button>
            <button className={!isMyCardsPack ? `${styles.btn} ${styles.btnActive}` : styles.btn} onClick={showAllCards}>All</button>
        </div>
    )
}