import React, {useState} from 'react';
import styles from './addNewPackModal.module.scss'
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import {useFormik} from 'formik';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {createCardsPackTC} from '../../Pages/PacksList/packsListReducer';
import Modal from '@mui/material/Modal';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const AddNewPackModal = () => {
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            name: '',
            private: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.name) {
                errors.name = 'Name is required'
            }

            return errors
        },
        onSubmit: values => {
            dispatch(createCardsPackTC(values))
            formik.resetForm()
        }
    })

    return (
        <div>
            <Button
                variant={'contained'}
                color={'primary'}
                style={{borderRadius: '30px', padding: '5px 30px'}}
                onClick={handleOpen}
            >
                Add new pack
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.box}>
                    <div className={styles.header}>
                        <div className={styles.title}>Add new pack</div>
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
                            <FormControlLabel
                                control={<Checkbox checked={formik.values.private}
                                                   {...formik.getFieldProps('private')}
                                />}
                                label="Private pack"
                                sx={{marginTop: '30px'}}
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
        </div>
    )
}

type FormikErrorType = {
    name?: string
    private?: boolean
}