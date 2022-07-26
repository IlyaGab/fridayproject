import React from 'react';
import styles from './passwordRecoveryPage.module.scss'
import { Button, FormControl, FormGroup, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { NavLink, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';
import { forgotTC } from './passwordRecoveryPageReducer';
import {PATH} from '../../../app/App';


type FormikErrorType = {
    email?: string
}

export const PasswordRecoveryPage = () => {

    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            from:'test-front-admin <ilyagab1994@gmail.com>',
            message:`<div style='padding:15px'>password recovery link: <a href='http://localhost:3000/#/change-pass-page/$token$'>link</a></div>`
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            return errors;
        },
        onSubmit: values => {
             dispatch(forgotTC(values))
            formik.resetForm();
        },
    })

    const isSend = useAppSelector(state => state.passwordRecoveryReducer.isSend)
    if(isSend) {
        return <Navigate to={PATH.CheckEmail}/>
    } 

    return (
        <div className={styles.recoveryPasswordPageContainer}>
            <FormControl>
                <form className={styles.recoveryPasswordPageForm} onSubmit={formik.handleSubmit}>
                    <h2 className={styles.signUpTitle}>Forgot your password?</h2>
                    <FormGroup>

                        <TextField
                            className={styles.emailTextField}
                            label="Email"
                            variant="standard"
                            margin="normal"
                            style={{ width: '347px', height: '48px' }}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
                        
                        <div className={styles.textFieldDescription}>Enter your email address and we will send you further instructions</div>
                    </FormGroup>
                    
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        style={{ width: '347px', height: '36px', borderRadius: '30px' }}>
                        Send Instructions
                    </Button>
                    <div className={styles.signInContainer}>
                        <div className={styles.text}>Did you remember your password?</div>
                        <NavLink to={PATH.Login}>Try loggin in</NavLink>
                    </div>
                </form>
            </FormControl>
        </div>
    )
}


