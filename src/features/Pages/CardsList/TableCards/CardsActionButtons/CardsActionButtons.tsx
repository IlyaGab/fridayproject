import React, {ReactElement, useState} from 'react';
import {CardType} from '../../../../../api/cardsAPI';
import {IconButton} from '../../../../../common/components/IconButton/IconButton';
import {faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {DeleteCardModal} from '../../../../Modals/cardsModals/DeleteCardModal';
import {EditCardModal} from '../../../../Modals/cardsModals/EditCardModal';

export const CardsActionButtons = ({row}: ActionButtonsPropsType): ReactElement => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const deleteCardHandler = () => {
        setIsDeleteModalOpen(true)
    }
    const editCardHandler = () => {
        setIsEditModalOpen(true)
    }

    return (
        <div>
            <IconButton
                iconName={faTrashCan}
                callback={deleteCardHandler}
            />
            <IconButton
                iconName={faPencil}
                callback={editCardHandler}
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