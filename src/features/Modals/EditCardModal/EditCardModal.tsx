import React, {useState} from 'react';
import styles from './editCardModal.module.scss'
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useFormik} from 'formik';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {changeCardTC} from '../../Pages/CardsList/cardsListReducer';
import {CardType} from '../../../api/cardsAPI';

type PropsType = {
    row: CardType
}

export const EditCardModal: React.FC<PropsType> = ({row}) => {
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            _id: row._id,
            question: row.question,
            answer: row.answer
        },
        onSubmit: values => {
            dispatch(changeCardTC(values))
            handleClose()
        }
    })
    return (
        <>
            <button
                onClick={handleOpen}
                className={styles.iconButton}
            >
                <FontAwesomeIcon
                    className={styles.icon}
                    icon={faPencil} size="lg"
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
                        <div className={styles.title}>Edit card</div>
                        <IconButton sx={{color: 'black', padding: '0'}} onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div className={styles.content}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                variant="standard"
                                label="Question"
                                sx={{width: '100%'}}
                                {...formik.getFieldProps('question')}
                            />
                            <TextField
                                variant="standard"
                                label="Answer"
                                sx={{width: '100%'}}
                                {...formik.getFieldProps('answer')}
                            />
                            <div className={styles.buttons}>
                                <Button
                                    variant={'contained'}
                                    onClick={handleClose}
                                    className={styles.button}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    className={styles.button}
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}