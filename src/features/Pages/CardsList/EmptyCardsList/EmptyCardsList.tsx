import React, {ReactElement} from 'react'

import {AddButton} from '../../../../common/components/AddButton/AddButton'
import {useAppSelector} from '../../../../common/hooks/useAppSelector'

import styles from './emptyCardsList.module.scss'

export const EmptyCardsList: React.FC<PropsType> = React.memo(
    ({setIsModalOpen}): ReactElement => {
        const isMyCards = useAppSelector(state => state.cardsList.infoCardsPack.isMyCards)
        const status = useAppSelector(state => state.app.status)

        const handleAddNewCard = (): void => {
            setIsModalOpen(true)
        }

        return (
            <div className={styles.emptyCardsList}>
                {isMyCards ? (
                    <div>
                        <p className={styles.message}>
                            This pack is empty. Click add new card to fill this pack
                        </p>
                        <AddButton
                            name="Add new card"
                            callback={handleAddNewCard}
                            disabled={status === 'loading'}
                        />
                    </div>
                ) : (
                    'No cards'
                )}
            </div>
        )
    },
)

type PropsType = {
    setIsModalOpen: (value: boolean) => void
}
