import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {PATH} from '../Pages';
import {loginTC} from './loginPageReducer';
import {Navigate, NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../common/hooks/useAppSelector';

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

                if (!values.password){
                    errors.password = 'Required password'
                } else if (values.password.length < 5) {
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
        return <Navigate to={'/profile-page'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <h1>It-incubator</h1>
                    <h2>Sign in</h2>
                    <FormGroup>
                        <TextField
                            label="Email"
                            variant="standard"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        { formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            type="password"
                            label="Password"
                            variant="standard"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        { formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}

                        <FormControlLabel
                            label={'Remember me'}
                            control={
                                <Checkbox
                                    checked={formik.values.rememberMe}
                                    {...formik.getFieldProps('rememberMe')}
                                />
                            }
                        />
                        <NavLink to={PATH.RecoveryPass}>Forgot Password</NavLink>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}>
                            Login
                        </Button>
                        <p>Don't have an account?</p>
                        <NavLink to={PATH.Registration}>Sign Up</NavLink>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
