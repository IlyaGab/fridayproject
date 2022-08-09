import React, {ReactElement} from "react";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {setIsMyCardsPackAC, setQueryParamsAC} from "../../packsListReducer";
import styles from "./showPacksCards.module.scss";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";

export const ShowPacksCards = (): ReactElement => {
    const dispatch = useAppDispatch()

    const isMyCardsPack = useAppSelector(state => state.packsList.isMyCardsPack)
    const user_id = useAppSelector(state => state.profileReducer._id)
    const status = useAppSelector(state => state.appReducer.status)

    const handleShowMyCards = () => {
        dispatch(setQueryParamsAC({user_id}))
        dispatch(setIsMyCardsPackAC(true))
    }

    const handleShowAllCards = () => {
        dispatch(setQueryParamsAC({user_id: ""}))
        dispatch(setIsMyCardsPackAC(false))
    }

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