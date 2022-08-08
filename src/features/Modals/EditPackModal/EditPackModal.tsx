import React, {useState} from 'react';
import styles from './editPackModal.module.scss'
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useFormik} from 'formik';
import {changeNameCardsPackTC} from '../../Pages/PacksList/packsListReducer';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {PackType} from '../../../api/packsAPI';

type PropsType = {
    userId: string
    row: PackType
}

export const EditPackModal: React.FC<PropsType> = ({userId, row}) => {
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            name: row.name,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.name) {
                errors.name = 'Name is required'
            }

            return errors
        },
        onSubmit: values => {
            dispatch(changeNameCardsPackTC(row._id, values.name))
            handleClose()
        }
    })
    return (
        <>
            <button
                onClick={handleOpen}
                className={styles.iconButton}
                disabled={userId !== row.user_id}
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
                        <div className={styles.title}>Edit pack</div>
                        <IconButton sx={{color: 'black', padding: '0'}} onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div className={styles.content}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                variant="standard"
                                label="Name Pack"
                                sx={{width: '100%'}}
                                {...formik.getFieldProps('name')}
                            />
                            {
                                formik.touched.name &&
                                formik.errors.name &&
                                <div style={{color: 'red'}}>{formik.errors.name}</div>
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
        </>
    )
}

type FormikErrorType = {
    name?: string
    private?: boolean
}