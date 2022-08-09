import React, {useState} from 'react';
import styles from './deleteCardModal.module.scss'
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CardType} from '../../../api/cardsAPI';
import {deleteCardTC} from '../../Pages/CardsList/cardsListReducer';

type PropsType = {
    row: CardType
}

export const DeleteCardModal: React.FC<PropsType> = ({row}) => {
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const dispatch = useAppDispatch()

    const deleteCardHandler = (id: string) => (): void => {
        dispatch(deleteCardTC(id))
        handleClose()
    }

    return (
        <>
            <button
                onClick={handleOpen}
                className={styles.iconButton}
            >
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={faTrashCan} size="lg"
                />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.box}>
                    <div className={styles.header}>
                        <div className={styles.title}>Delete Card</div>
                        <IconButton sx={{color: 'black', padding: '0'}} onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.attention}>
                            Do you really want to remove <b>{row.question}</b>?
                        </div>
                        <div className={styles.buttons}>
                            <Button
                                variant={'contained'}
                                onClick={handleClose}
                                className={styles.button}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant={'contained'}
                                color={'error'}
                                onClick={deleteCardHandler(row._id)}
                                className={styles.button}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}