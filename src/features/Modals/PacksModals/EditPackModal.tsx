import React, {useEffect, useState} from 'react';
import {CustomModal} from '../CustomModal';
import Input from '@mui/material/Input';
import {PackType} from '../../../api/packsAPI';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {changeNameCardsPackTC} from '../../Pages/PacksList/packsListReducer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styles from '../customModal.module.scss';
import {InputTypeFile} from '../../../common/components/InputTypeFile/InputTypeFile';

export const EditPackModal: React.FC<EditPackModalPropsType> = ({isModalOpen, setIsModalOpen, row}) => {
    const [newPackName, setNewPackName] = useState<string>(row.name ? row.name : '')
    const [isPrivate, setIsPrivate] = useState(row.private ? row.private : false)
    const [deckCover, setDeckCover] = useState<string>(row.deckCover ? row.deckCover : '')

    const dispatch = useAppDispatch()

    useEffect(() => {
        setNewPackName(row.name)
    }, [row])

    const updateCardPack = () => {
        dispatch(changeNameCardsPackTC({_id: row._id, name: newPackName, private: isPrivate, deckCover}))
        setNewPackName(newPackName)
        setIsPrivate(isPrivate)
        setDeckCover(deckCover)
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
            {deckCover &&
                <>
                    <div className={styles.text}>Cover</div>
                    <div className={styles.imageContainer}>
                        <img src={deckCover} alt="packImage" className={styles.image}/>
                    </div>
                </>
            }
            <InputTypeFile
                buttonTitle={'Upload Image'}
                setImage={setDeckCover}
            />
            <Input
                value={newPackName}
                placeholder={'Name pack'}
                onChange={e => setNewPackName(e.currentTarget.value)}
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

type EditPackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    row: PackType
}
