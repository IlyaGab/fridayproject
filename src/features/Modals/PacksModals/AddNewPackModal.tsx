import React, {FC, useState} from 'react';
import styles from '../customModal.module.scss'
import Input from '@mui/material/Input';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {CustomModal} from '../CustomModal';
import {createCardsPackTC} from '../../Pages/PacksList/packsListReducer';
import {InputTypeFile} from '../../../common/components/InputTypeFile/InputTypeFile';

export const AddNewPackModal: FC<AddNewPackModalPropsType> = ({isModalOpen, setIsModalOpen}) => {
    const [packName, setPackName] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false)
    const [image, setImage] = useState('')

    const dispatch = useAppDispatch();

    const addCardPack = () => {
        dispatch(createCardsPackTC({name: packName, private: isPrivate, deckCover: image}));
        setPackName('')
        setIsPrivate(false)
        setImage('')
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
            {image &&
                <>
                    <div className={styles.text}>Cover</div>
                    <div className={styles.imageContainer}>
                        <img src={image} alt="packImage" className={styles.image}/>
                    </div>
                </>
            }
            <InputTypeFile
                buttonTitle={'Upload Image'}
                setImage={setImage}
            />
            <Input
                value={packName}
                placeholder={'Name pack'}
                onChange={e => setPackName(e.currentTarget.value)}
                fullWidth={true}
                style={{marginBottom: '20px'}}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isPrivate}
                        onChange={e => setIsPrivate(e.currentTarget.checked)}
                    />}
                label="Private pack"
            />
        </CustomModal>
    )
}

type AddNewPackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}
