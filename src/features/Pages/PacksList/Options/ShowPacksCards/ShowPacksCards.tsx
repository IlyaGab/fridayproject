import { Button } from "@mui/material";
import React, {ReactElement} from "react";
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch";
import {getPackListTC, setIsMyCardsPackAC} from '../../packsListReducer';
import styles from "./showPacksCards.module.scss";


export const ShowPacksCards = (): ReactElement => {
    const dispatch = useAppDispatch()
    const onClickMyCards = () => {
        dispatch(setIsMyCardsPackAC(true))
        dispatch(getPackListTC())
    }

    const onClickAllCards = () => {
        dispatch(setIsMyCardsPackAC(false))
        dispatch(getPackListTC())
    }
    return (
        <div className={styles.showPacksCards}>
            <h3>
                <Button onClick={onClickMyCards}>MY</Button>
                <Button onClick={onClickAllCards}>All</Button>
            </h3>
        </div>
    )
}