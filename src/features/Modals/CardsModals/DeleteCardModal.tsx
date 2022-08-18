import React from 'react';
import {CustomModal} from '../CustomModal';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {CardType} from '../../../api/cardsAPI';
import {deleteCardTC} from '../../Pages/CardsList/cardsListReducer';

export const DeleteCardModal: React.FC<DeleteCardModalPropsType> = ({isModalOpen, setIsModalOpen, row}) => {
    const dispatch = useAppDispatch();

    const deleteCard = () => {
        dispatch(deleteCardTC(row._id))
        setIsModalOpen(false)
    }
    return (
        <CustomModal
            modalTitle={'Delete card'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={deleteCard}
            buttonTitle={'Delete'}
        >
            <div>
                <p>Do you really want to remove <b>{row.question}</b>?</p>
            </div>
        </CustomModal>
    )
}

type DeleteCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    row: CardType
}
