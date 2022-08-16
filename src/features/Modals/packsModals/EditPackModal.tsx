import React, {useEffect, useState} from 'react';
import {CustomModal} from '../CustomModal';
import Input from '@mui/material/Input';
import {PackType} from '../../../api/packsAPI';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {changeNameCardsPackTC} from '../../Pages/PacksList/packsListReducer';

type EditPackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    row: PackType
}

export const EditPackModal: React.FC<EditPackModalPropsType> = ({isModalOpen, setIsModalOpen, row}) => {
    const [newPackName, setNewPackName] = useState<string>(row.name ? row.name : '')

    const dispatch = useAppDispatch()

    useEffect(() => {
        setNewPackName(row.name)
    }, [row])

    const updateCardPack = () => {
        dispatch(changeNameCardsPackTC(row._id, newPackName))
        setNewPackName(newPackName)
        setIsModalOpen(false)
    }

    return (
        <CustomModal
            modalTitle={'Edit pack name'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={updateCardPack}
            buttonTitle={'Save'}
        >
            <div>
                <Input
                    value={newPackName}
                    placeholder={'Name pack'}
                    onChange={e => setNewPackName(e.currentTarget.value)}
                    fullWidth={true}
                    style={{marginBottom: '20px'}}
                />
            </div>
        </CustomModal>
    )
}