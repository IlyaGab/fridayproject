import React, {FC, useState} from 'react';
import Input from '@mui/material/Input';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {CustomModal} from '../CustomModal';
import {createCardsPackTC} from '../../Pages/PacksList/packsListReducer';

export const AddNewPackModal: FC<AddNewPackModalPropsType> = ({isModalOpen, setIsModalOpen}) => {
    const [packName, setPackName] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false)

    const dispatch = useAppDispatch();

    const addCardPack = () => {
        dispatch(createCardsPackTC({name: packName, private: isPrivate}));
        setPackName('')
        setIsModalOpen(false)
    }

    return (
        <CustomModal
            modalTitle={'Add new pack'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={addCardPack}
            buttonTitle={'Save'}
        >
            <div>
                <Input
                    value={packName}
                    placeholder={'Name pack'}
                    onChange={e => setPackName(e.currentTarget.value)}
                    fullWidth={true}
                    style={{marginBottom: '20px'}}
                />
            </div>
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isPrivate}
                            onChange={e => setIsPrivate(e.currentTarget.checked)}
                        />}
                    label="Private pack"
                />
            </div>
        </CustomModal>
    )
}

type AddNewPackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}
