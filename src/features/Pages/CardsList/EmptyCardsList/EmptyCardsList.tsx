import React, {ReactElement} from 'react';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import styles from './emptyCardsList.module.scss'
import {AddButton} from '../../../../common/components/AddButton/AddButton';

export const EmptyCardsList: React.FC<PropsType> = ({setIsModalOpen}): ReactElement => {
    const isMyCards = useAppSelector(state => state.cardsList.infoCardsPack.isMyCards)
    const status = useAppSelector(state => state.appReducer.status)

    const handleAddNewCard = () => {
        setIsModalOpen(true)
    }

    return (
        <div className={styles.emptyCardsList}>
            {isMyCards
                ? <div>
                    <p className={styles.message}>This pack is empty. Click add new card to fill
                        this pack</p>
                    <AddButton name={'Add new card'} callback={handleAddNewCard} disabled={status === 'loading'}/>
                </div>
                : 'No cards'
            }
        </div>
    )
}

type PropsType = {
    setIsModalOpen: (value: boolean) => void
}