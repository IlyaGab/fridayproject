import React from 'react';
import styles from './passwordRecoveryPage.module.scss'
import {Button, FormControl, FormGroup, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {NavLink, Navigate} from 'react-router-dom';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {forgotTC} from './passwordRecoveryPageReducer';
import {PATH} from "../../../common/components/RoutesList/RoutersList";

export const PasswordRecoveryPage = () => {
    const isSendMessageToEmail = useAppSelector(state => state.passwordRecoveryReducer.isSendMessageToEmail)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            from: 'test-front-admin <ilyagab1994@gmail.com>',
            message: `<div style='padding:15px'>password recovery link: <a href='http://localhost:3000/#/change-pass-page/$token$'>link</a></div>`
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

    if (isSendMessageToEmail) {
        return <Navigate to={PATH.CheckEmail}/>
    }

    return (
        <div className={styles.recoveryPasswordPage}>
            <div className={styles.container}>
                <div className={styles.recoveryPassword}>
                    <FormControl style={{width: '100%'}}>
                        <form className={styles.recoveryPasswordPageForm}
                              onSubmit={formik.handleSubmit}>
                            <h2>Forgot your password?</h2>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    margin="normal"
                                    style={{
                                        marginTop: '50px',
                                        width: '100%'
                                    }}
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email &&
                                    <div style={{color: 'red'}}>{formik.errors.email}</div>}
                                <p>Enter your email address and we will send you further
                                    instructions
                                </p>
                            </FormGroup>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                style={{width: '100%', borderRadius: '30px', marginTop: "65px"}}>
                                Send Instructions
                            </Button>
                            <div className={styles.linkBlock}>
                                <div className={styles.text}>Did you remember your password?</div>
                                <NavLink to={PATH.Login} className={styles.link}>Try logging
                                    in</NavLink>
                            </div>
                        </form>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

//Types
type FormikErrorType = {
    email?: string
}