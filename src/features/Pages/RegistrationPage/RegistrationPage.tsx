import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';
import classes from './registrationPage.module.scss'
import FormControl from '@mui/material/FormControl';
import {FormGroup} from '@mui/material';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useFormik} from 'formik';
import {registerTC} from './registrationPageReducer';
import {ErrorSnackbar} from '../../../common/components/ErrorSnackbar/ErrorSnackbar';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {Navigate, NavLink} from 'react-router-dom';
import {PATH} from '../Pages';

export const RegistrationPage = () => {
    const isRegister = useAppSelector(state => state.registrationReducer.isRegister)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
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
            if (!values.confirm && values.password) {
                errors.confirm = 'Confirm your password'
            } else if (values.password !== values.confirm) {
                errors.confirm = 'Password doesn\'t match'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(registerTC(values))
            formik.resetForm()
        }
    })

    if (isRegister) {
        return <Navigate to={PATH.Login}/>
    }

    return (
        <div className={classes.registrationPageBlock}>
            <FormControl>
                <form className={classes.registrationForm} onSubmit={formik.handleSubmit}>
                    <h2 className={classes.signUpTitle}>Sign Up</h2>
                    <FormGroup>
                        <TextField label="Email"
                                   variant="standard"
                                   margin="normal"
                                   size={'small'}
                                   style={{width: '347px', height: '48px'}}
                                   {...formik.getFieldProps('email')}
                        />
                        {
                            formik.touched.email &&
                            formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>
                        }
                        <TextField type={'password'}
                                   label="Password"
                                   variant="standard"
                                   margin="normal"
                                   size={'small'}
                                   {...formik.getFieldProps('password')}
                        />
                        {
                            formik.touched.password &&
                            formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>
                        }
                        <TextField type={'password'}
                                   label="Confirm"
                                   variant="standard"
                                   margin="normal"
                                   size={'small'}
                                   {...formik.getFieldProps('confirm')}
                        />
                        {
                            formik.touched.confirm &&
                            formik.errors.confirm &&
                            <div style={{color: 'red'}}>{formik.errors.confirm}</div>
                        }
                    </FormGroup>
                    <Button type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            style={{width: '347px', height: '36px', borderRadius: '30px'}}
                    >Sign Up
                    </Button>
                    <div className={classes.signInContainer}>
                        <div className={classes.text}>Don't have an account?</div>
                        <NavLink to={PATH.Login}>Sign In</NavLink>
                    </div>
                </form>
            </FormControl>
            <ErrorSnackbar/>
        </div>
    );
};

type FormikErrorType = {
    email?: string
    password?: string
    confirm?: string
}

