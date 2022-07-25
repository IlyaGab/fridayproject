import React from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { PATH } from '../Pages';
import { loginTC } from './loginPageReducer';
import { Navigate, NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';
import styles from './loginPage.module.scss'
import { ErrorSnackbar } from '../../../common/components/ErrorSnackbar/ErrorSnackbar';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const LoginPage = () => {

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
                errors.email = 'Required email';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required password'
            } else if (values.password.length < 7) {
                errors.password = 'Invalid password'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm();
        },
    })

    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)
    if (isLoggedIn) {
        return <Navigate to={'/profile-page'} />
    }

    return (
        <div className={styles.loginPageContainer}>
            <FormControl>
                <form className={styles.loginPageForm} onSubmit={formik.handleSubmit}>
                    <h1>It-incubator</h1>
                    <h2 className={styles.signUpTitle}>Sign In</h2>
                    <FormGroup>
                        <TextField
                            label="Email"
                            variant="standard"
                            margin="normal"
                            style={{ width: '347px', height: '48px' }}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
                        <TextField
                            type="password"
                            label="Password"
                            variant="standard"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
                        <FormControlLabel
                            label={'Remember me'}
                            style={{ marginTop: '20px' }}
                            control={
                                <Checkbox
                                    checked={formik.values.rememberMe}
                                    {...formik.getFieldProps('rememberMe')}
                                />
                            }
                        />
                    </FormGroup>

                    <NavLink to={PATH.RecoveryPass}>Forgot Password</NavLink>
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        style={{ width: '347px', height: '36px', borderRadius: '30px' }}>
                        Login
                    </Button>
                    <div className={styles.signInContainer}>
                        <div className={styles.text}>Don't have an account?</div>
                        <NavLink to={PATH.Registration}>Sign Up</NavLink>
                    </div>
                </form>
            </FormControl>
            <ErrorSnackbar />
        </div>
    )
}
