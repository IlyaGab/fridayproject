import React, {useState} from 'react';
import styles from './addNewCardModal.module.scss'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useFormik} from 'formik';
import {createCardTC} from '../../Pages/CardsList/cardsListReducer';

type PropsType = {
    cardsPackId: string
}

export const AddNewCardModal: React.FC<PropsType> = ({cardsPackId}) => {
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            cardsPack_id: cardsPackId,
            question: '',
            answer: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.question) {
                errors.question = 'Question is required'
            }
            if (!values.answer) {
                errors.answer = 'Answer is required'
            }

            return errors
        },
        onSubmit: values => {
            dispatch(createCardTC(values))
            formik.resetForm()
            handleClose()
        }
    })

    return (
        <div>
            <Button
                variant={'contained'}
                color={'primary'}
                sx={{borderRadius: '30px', padding: '5px 30px'}}
                onClick={handleOpen}
            >
                Add new card
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.box}>
                    <div className={styles.header}>
                        <div className={styles.title}>Add new card</div>
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
                            {
                                formik.touched.question &&
                                formik.errors.question &&
                                <div style={{color: 'red'}}>{formik.errors.question}</div>
                            }
                            <TextField
                                variant="standard"
                                label="Answer"
                                sx={{width: '100%'}}
                                {...formik.getFieldProps('answer')}
                            />
                            {
                                formik.touched.answer &&
                                formik.errors.answer &&
                                <div style={{color: 'red'}}>{formik.errors.answer}</div>
                            }
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
        </div>
    )
}

type FormikErrorType = {
    question?: string
    answer?: string
}
