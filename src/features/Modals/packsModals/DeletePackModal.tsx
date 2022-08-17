import React from 'react';
import {PackType} from '../../../api/packsAPI';
import {CustomModal} from '../CustomModal';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {deleteCardsPackTC} from '../../Pages/PacksList/packsListReducer';

export const DeletePackModal: React.FC<DeletePackModalPropsType> = ({isModalOpen, setIsModalOpen, row}) => {
    const dispatch = useAppDispatch();

    const deleteCardPack = () => {
        dispatch(deleteCardsPackTC(row._id));
        setIsModalOpen(false)
    }
    return (
        <CustomModal
            modalTitle={'Delete pack'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={deleteCardPack}
            buttonTitle={'Delete'}
        >
            <div>
                <p>Do you really want to remove <b>{row.name}</b>?</p>
                <p>All cards will be deleted.</p>
            </div>
        </CustomModal>
    )
}

type DeletePackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    row: PackType
}
