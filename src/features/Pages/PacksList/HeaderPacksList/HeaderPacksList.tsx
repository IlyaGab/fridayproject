import React, {ReactElement} from "react";
import styles from "./headerPacksList.module.scss";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {createCardsPackTC} from "../packsListReducer";
import {AddButton} from "../../../../common/components/AddButton/AddButton";

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
            <AddButton name={"Add new pack"} callback={onClickHandler}/>
        </div>
    )
}