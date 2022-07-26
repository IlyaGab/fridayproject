import React from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { loginTC } from './loginPageReducer';
import { Navigate, NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';
import styles from './loginPage.module.scss'
import { ErrorSnackbar } from '../../../common/components/ErrorSnackbar/ErrorSnackbar';
import {PATH} from '../../../app/App';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const LoginPage = () => {
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)

    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 7) {
                errors.password = 'Password must be more than 7 characters...'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm();
        },
    })

    if (isLoggedIn) {
        return <Navigate to={PATH.Profile} />
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.container}>
                <div className={styles.login}>
                    <FormControl style={{width: "100%"}}>
                        <form className={styles.loginPageForm} onSubmit={formik.handleSubmit}>
                            <h2>Sign In</h2>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    margin="normal"
                                    style={{ width: '100%', marginTop: "40px" }}
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
                                <TextField
                                    type="password"
                                    label="Password"
                                    variant="standard"
                                    margin="normal"
                                    style={{marginTop: "10px"}}
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
                                <FormControlLabel
                                    label={'Remember me'}
                                    style={{ marginTop: '10px', fontWeight: "500",fontSize: "14px", lineHeight: "17px", fontFamily: "inherit" }}
                                    control={
                                        <Checkbox
                                            checked={formik.values.rememberMe}
                                            {...formik.getFieldProps('rememberMe')}
                                        />
                                    }
                                />
                            </FormGroup>
                            <NavLink to={PATH.RecoveryPass} className={styles.linkForgot}>Forgot Password?</NavLink>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                style={{ width: "100%", borderRadius: '30px' , marginTop: "50px"}}>
                                Sign In
                            </Button>
                            <div className={styles.signUpContainer}>
                                <div className={styles.text}>Don't have an account?</div>
                                <NavLink to={PATH.Registration} className={styles.link}>Sign Up</NavLink>
                            </div>
                        </form>
                    </FormControl>
                    <ErrorSnackbar />
                </div>
            </div>
        </div>
    )
}
