import React from 'react'

import {CardType} from '../../../api/cardsAPI'
import {useAppDispatch} from '../../../common/hooks/useAppDispatch'
import {deleteCardTC} from '../../Pages/CardsList/cardsListReducer'
import {CustomModal} from '../CustomModal'

export const DeleteCardModal: React.FC<DeleteCardModalPropsType> = ({
    isModalOpen,
    setIsModalOpen,
    row,
}) => {
    const dispatch = useAppDispatch()
    const image = row.questionImg

    const deleteCard = (): void => {
        dispatch(deleteCardTC(row._id))
        setIsModalOpen(false)
    }

    return (
        <CustomModal
            modalTitle="Delete card"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={deleteCard}
            buttonTitle="Delete"
        >
            <div>
                <p>
                    Do you really want to remove{' '}
                    {image ? 'this card' : <b>{row.question}</b>}?
                </p>
            </div>
        </CustomModal>
    )
}

type DeleteCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    row: CardType
}
