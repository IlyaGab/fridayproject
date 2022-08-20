import React, {ReactElement, useState} from 'react';
import {CardType} from '../../../../../api/cardsAPI';
import {IconButton} from '../../../../../common/components/IconButton/IconButton';
import {faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {DeleteCardModal} from '../../../../Modals/CardsModals/DeleteCardModal';
import {EditCardModal} from '../../../../Modals/CardsModals/EditCardModal';
import {useAppSelector} from '../../../../../common/hooks/useAppSelector';

export const CardsActionButtons = ({row}: ActionButtonsPropsType): ReactElement => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const status = useAppSelector(state => state.appReducer.status)

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
                disabled={status === 'loading'}
            />
            <IconButton
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