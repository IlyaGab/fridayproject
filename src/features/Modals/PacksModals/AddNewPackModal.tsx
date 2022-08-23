import React, {useState} from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Input from '@mui/material/Input'

import {InputTypeFile} from '../../../common/components/InputTypeFile/InputTypeFile'
import {useAppDispatch} from '../../../common/hooks/useAppDispatch'
import {createCardsPackTC} from '../../Pages/PacksList/packsListReducer'
import {CustomModal} from '../CustomModal'
import styles from '../customModal.module.scss'

export const AddNewPackModal: React.FC<AddNewPackModalPropsType> = ({
    isModalOpen,
    setIsModalOpen,
}) => {
    const [packName, setPackName] = useState<string>('')
    const [isPrivate, setIsPrivate] = useState<boolean>(false)
    const [image, setImage] = useState('')

    const dispatch = useAppDispatch()

    const addCardPack = (): void => {
        dispatch(
            createCardsPackTC({name: packName, private: isPrivate, deckCover: image}),
        )
        setPackName('')
        setIsPrivate(false)
        setImage('')
        setIsModalOpen(false)
    }

    return (
        <CustomModal
            modalTitle="Add new pack"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={addCardPack}
            buttonTitle="Save"
        >
            {image && (
                <>
                    <div className={styles.text}>Cover</div>
                    <div className={styles.imageContainer}>
                        <img src={image} alt="packImage" className={styles.image} />
                    </div>
                </>
            )}
            <InputTypeFile buttonTitle="Upload Image" setImage={setImage} />
            <Input
                value={packName}
                placeholder="Name pack"
                onChange={e => setPackName(e.currentTarget.value)}
                fullWidth
                style={{marginBottom: '20px'}}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isPrivate}
                        onChange={e => setIsPrivate(e.currentTarget.checked)}
                    />
                }
                label="Private pack"
            />
        </CustomModal>
    )
}

type AddNewPackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}
