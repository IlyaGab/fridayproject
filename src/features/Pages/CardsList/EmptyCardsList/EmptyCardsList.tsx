import React, {ReactElement} from "react";
import {AddButton} from "../../../../common/components/AddButton/AddButton";
import {createCardTC} from "../cardsListReducer";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import styles from "./emptyCardsList.module.scss"
import {AddNewCardModal} from '../../../Modals/AddNewCardModal/AddNewCardModal';

export const EmptyCardsList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const cardsPack_id = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)
    const isMyCards = useAppSelector(state => state.cardsList.infoCardsPack.isMyCards)

    const addNewCard = (): void => {
        dispatch(createCardTC({cardsPack_id}))
    }

    return (
        <div className={styles.emptyCardsList}>
            {isMyCards
                ? <div>
                    <p className={styles.message}>This pack is empty. Click add new card to fill
                        this pack</p>
                    {/*<AddButton name={"Add new card"} callback={addNewCard}/>*/}
                    <AddNewCardModal cardsPackId={cardsPack_id}/>
                </div>
                : ""
            }
        </div>
    )
}