import React, {ReactElement} from "react";
import styles from "./headerPacksList.module.scss";
import {Button} from "@mui/material";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {createCardsPackTC} from "../packsListReducer";

export const HeaderPacksList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const onClickHandler = (): void => {
        const newCardsPack = {
                name: "New Cards Pack"
        }
        dispatch(createCardsPackTC(newCardsPack))
    }

    return (
        <div className={styles.header}>
            <h2>
                Packs List
            </h2>
            <Button
                variant={"contained"}
                color={"primary"}
                style={{borderRadius: "30px", padding: "5px 30px"}}
                onClick={onClickHandler}
            >
                Add new pack
            </Button>
        </div>
    )
}