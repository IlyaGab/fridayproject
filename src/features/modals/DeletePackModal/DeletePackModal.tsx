import React, {useState} from 'react';
import styles from './deletePackModal.module.scss'
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {PackType} from '../../../api/packsAPI';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {deleteCardsPackTC} from '../../Pages/PacksList/packsListReducer';


type PropsType = {
    userId: string
    row: PackType
}

export const DeletePackModal: React.FC<PropsType> = ({userId, row}) => {
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(deleteCardsPackTC(row._id))
    }

    return (
        <>
            <button
                // onClick={deleteCardsPackHandler(row._id)}
                onClick={handleOpen}
                className={styles.iconButton}
                disabled={userId !== row.user_id}
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
                        <div className={styles.title}>Delete Pack</div>
                        <IconButton sx={{color: 'black', padding: '0'}} onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.attention}>
                            Do you really want to remove <b>{row.name}</b>? <br/>
                            All cards will be deleted.
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
                                onClick={handleClick}
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