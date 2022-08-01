import { Button } from "@mui/material";
import React, {ReactElement} from "react";
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch";
import { getPackListTC } from "../../packsListReducer";
import styles from "./showPacksCards.module.scss";
import {useAppSelector} from '../../../../../common/hooks/useAppSelector';

export const ShowPacksCards = (): ReactElement => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.profileReducer._id)
    const onClickMyCards = () => {
        dispatch(getPackListTC(`?user_id=${userId}`))
    }

    const onClickAllCards = () => {
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