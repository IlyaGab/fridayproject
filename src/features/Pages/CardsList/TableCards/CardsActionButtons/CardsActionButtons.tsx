import React, {ReactElement, useState} from 'react'

import {faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons'

import {CardType} from '../../../../../api/cardsAPI'
import {CustomIconButton} from '../../../../../common/components/CustomIconButton/CustomIconButton'
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../../../common/hooks/useAppSelector'
import {DeleteCardModal} from '../../../../Modals/CardsModals/DeleteCardModal'
import {EditCardModal} from '../../../../Modals/CardsModals/EditCardModal'
import {setInfoCardsPackAC} from '../../cardsListReducer'

export const CardsActionButtons = ({row}: ActionButtonsPropsType): ReactElement => {
    const dispatch = useAppDispatch()

    const status = useAppSelector(state => state.app.status)
    const cardsCount = useAppSelector(state => state.cardsList.infoCardsPack.cardsCount)

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const deleteCardHandler = (): void => {
        setIsDeleteModalOpen(true)
        dispatch(setInfoCardsPackAC({cardsCount: cardsCount - 1}))
    }
    const editCardHandler = (): void => {
        setIsEditModalOpen(true)
    }

    return (
        <div>
            <CustomIconButton
                iconName={faTrashCan}
                callback={deleteCardHandler}
                disabled={status === 'loading'}
            />
            <CustomIconButton
                iconName={faPencil}
                callback={editCardHandler}
                disabled={status === 'loading'}
            />
            <DeleteCardModal
                isModalOpen={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
                row={row}
            />
            <EditCardModal
                isModalOpen={isEditModalOpen}
                setIsModalOpen={setIsEditModalOpen}
                row={row}
            />
        </div>
    )
}

type ActionButtonsPropsType = {
    row: CardType
}
