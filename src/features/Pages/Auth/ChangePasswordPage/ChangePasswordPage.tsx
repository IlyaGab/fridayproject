import React, {ReactElement} from 'react'

import {Visibility, VisibilityOff} from '@mui/icons-material'
import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
} from '@mui/material'
import {useFormik} from 'formik'
import {Navigate, useParams} from 'react-router-dom'

import {ErrorSnackbar} from '../../../../common/components/ErrorSnackbar/ErrorSnackbar'
import {PATH} from '../../../../common/components/RoutesList/RoutersList'
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../../common/hooks/useAppSelector'

import styles from './changePasswordPage.module.scss'
import {setNewPasswordTC} from './changePasswordReducer'

export const ChangePasswordPage = (): ReactElement => {
    const minPassLength = 7
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    const isSetNewPassword = useAppSelector(
        state => state.changePassReducer.isSetNewPassword,
    )

    const dispatch = useAppDispatch()

    const params = useParams<'*'>()

    const handleClickShowPassword = (): void => {
        setShowPassword(!showPassword)
    }

    const formik = useFormik({
        initialValues: {
            newPassword: '',
        },
        validate: values => {
            const errors: FormikErrorType = {}

            if (!values.newPassword) {
                errors.newPassword = 'Required password'
            } else if (values.newPassword.length < minPassLength) {
                errors.newPassword = 'Invalid password'
            }

            return errors
        },
        onSubmit: values => {
            const token = params['*']

            if (token) {
                dispatch(setNewPasswordTC(values.newPassword, token))
            }
            formik.resetForm()
        },
    })

    if (isSetNewPassword) {
        return <Navigate to={PATH.Login} />
    }

    return (
        <div className={styles.changePasswordPage}>
            <div className={styles.container}>
                <div className={styles.changePassword}>
                    <FormControl style={{width: '100%'}}>
                        <form
                            className={styles.loginPageForm}
                            onSubmit={formik.handleSubmit}
                        >
                            <h2>Create new password</h2>
                            <InputLabel
                                htmlFor="password"
                                style={{
                                    marginTop: '90px',
                                    width: '100%',
                                }}
                            >
                                Password
                            </InputLabel>
                            <Input
                                id="password"
                                style={{marginTop: '70px', width: '100%'}}
                                type={showPassword ? 'text' : 'password'}
                                {...formik.getFieldProps('newPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
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
                            <div style={{color: 'red'}}>{formik.errors.newPassword}</div>
                            <p className={styles.text}>
                                Create new password and we will send you further
                                instructions to email
                            </p>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{
                                    width: '100%',
                                    borderRadius: '30px',
                                    marginTop: '40px',
                                }}
                            >
                                Create new password
                            </Button>
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
    newPassword?: string
}
