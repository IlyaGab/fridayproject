import React, {ReactElement, useState} from 'react'

import {faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons'

import {CardType} from '../../../../../api/cardsAPI'
import {CustomIconButton} from '../../../../../common/components/CustomIconButton/CustomIconButton'
import {useAppSelector} from '../../../../../common/hooks/useAppSelector'
import {DeleteCardModal} from '../../../../Modals/CardsModals/DeleteCardModal'
import {EditCardModal} from '../../../../Modals/CardsModals/EditCardModal'

export const CardsActionButtons = ({row}: ActionButtonsPropsType): ReactElement => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const status = useAppSelector(state => state.app.status)

    const deleteCardHandler = (): void => {
        setIsDeleteModalOpen(true)
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
