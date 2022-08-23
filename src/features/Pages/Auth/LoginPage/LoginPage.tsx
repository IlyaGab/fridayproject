import React, {ReactElement, useState} from 'react'

import {Visibility, VisibilityOff} from '@mui/icons-material'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    TextField,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import {useFormik} from 'formik'
import {Navigate, NavLink} from 'react-router-dom'

import {ErrorSnackbar} from '../../../../common/components/ErrorSnackbar/ErrorSnackbar'
import {PATH} from '../../../../common/components/RoutesList/RoutersList'
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../../common/hooks/useAppSelector'

import styles from './loginPage.module.scss'
import {loginTC} from './loginPageReducer'

export const LoginPage = (): ReactElement => {
    const minPassLength = 7
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: values => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < minPassLength) {
                errors.password = 'Password must be more than 7 characters...'
            }

            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    const onClickPasswordHandler = (): void => {
        setShowPassword(!showPassword)
    }

    if (isLoggedIn) {
        return <Navigate to={PATH.Profile} />
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.container}>
                <div className={styles.login}>
                    <FormControl style={{width: '100%'}}>
                        <form
                            className={styles.loginPageForm}
                            onSubmit={formik.handleSubmit}
                        >
                            <h2>Sign In</h2>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    margin="normal"
                                    style={{width: '100%', marginTop: '40px'}}
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div style={{color: 'red'}}>
                                        {formik.errors.email}
                                    </div>
                                )}
                                <FormControl
                                    variant="standard"
                                    style={{marginTop: '20px'}}
                                >
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...formik.getFieldProps('password')}
                                        endAdornment={
                                            <InputAdornment
                                                position="end"
                                                sx={{marginBottom: '13.92px'}}
                                            >
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={onClickPasswordHandler}
                                                    sx={{color: 'black'}}
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {formik.touched.password && formik.errors.password && (
                                    <div style={{color: 'red'}}>
                                        {formik.errors.password}
                                    </div>
                                )}
                                <FormControlLabel
                                    label="Remember me"
                                    style={{
                                        marginTop: '10px',
                                        fontWeight: '500',
                                        fontSize: '14px',
                                        lineHeight: '17px',
                                        fontFamily: 'inherit',
                                    }}
                                    control={
                                        <Checkbox
                                            checked={formik.values.rememberMe}
                                            {...formik.getFieldProps('rememberMe')}
                                        />
                                    }
                                />
                            </FormGroup>
                            <NavLink to={PATH.ForgotPass} className={styles.linkForgot}>
                                Forgot Password?
                            </NavLink>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{
                                    width: '100%',
                                    borderRadius: '30px',
                                    marginTop: '50px',
                                }}
                            >
                                Sign In
                            </Button>
                            <div className={styles.linkBlock}>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <div className={styles.text}>Don't have an account?</div>
                                <NavLink to={PATH.Registration} className={styles.link}>
                                    Sign Up
                                </NavLink>
                            </div>
                        </form>
                    </FormControl>
                    <ErrorSnackbar />
                </div>
            </div>
        </div>
    )
}

// Types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
