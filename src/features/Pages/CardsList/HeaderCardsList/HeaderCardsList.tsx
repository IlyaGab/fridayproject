import React, {ReactElement} from "react";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {AddButton} from "../../../../common/components/AddButton/AddButton";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {createCardTC} from "../cardsListReducer";
import styles from "./headerCardsList.module.scss"

export const HeaderPacksList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const packUserId = useAppSelector(state => state.cardsList.packUserId)
    const userId = useAppSelector(state => state.profileReducer._id)
    const cards = useAppSelector(state => state.cardsList.cards)
    const cardsPack_id = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)
    const packName = useAppSelector(state => state.cardsList.queryParams.packName)

    const addNewCard = () => {
        dispatch(createCardTC({cardsPack_id}))
    }

    return (
        <div className={styles.header}>
            <h2>
                {packName}
            </h2>
            {userId === packUserId && !!cards.length && <AddButton name={"Add new card"} callback={addNewCard} />}
        </div>
    )
}