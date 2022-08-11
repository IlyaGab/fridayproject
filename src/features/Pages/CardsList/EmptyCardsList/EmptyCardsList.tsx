import React, {ReactElement} from 'react';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import styles from './emptyCardsList.module.scss'
import {AddNewCardModal} from '../../../Modals/AddNewCardModal/AddNewCardModal';

export const EmptyCardsList = (): ReactElement => {

    const cardsPack_id = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)
    const isMyCards = useAppSelector(state => state.cardsList.infoCardsPack.isMyCards)

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