import { Button } from "@mui/material";
import React, {ReactElement} from "react";
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../../../../common/hooks/useAppSelector";
import { getPackListTC } from "../../packsListReducer";
import styles from "./showPacksCards.module.scss";

export const ShowPacksCards = (): ReactElement => {
    const dispatch = useAppDispatch()

    const onClickMyCards = () => {
        dispatch(getPackListTC(`?user_id=62bbddd9b063c900042ab835`))
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