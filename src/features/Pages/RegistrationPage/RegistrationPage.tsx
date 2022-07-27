import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import styles from './registrationPage.module.scss'
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useFormik} from 'formik';
import {registerTC} from './registrationPageReducer';
import {ErrorSnackbar} from '../../../common/components/ErrorSnackbar/ErrorSnackbar';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {Navigate, NavLink} from 'react-router-dom';
import {PATH} from '../../../app/App';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';

export const RegistrationPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const isRegistered = useAppSelector(state => state.registrationReducer.isRegistered)
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

    const onClickPasswordHandler = () => {
        setShowPassword(!showPassword)
    }
    const onClickConfirmPasswordHandler = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    if (isRegistered) {
        return <Navigate to={PATH.Login}/>
    }

    return (
        <div className={styles.registrationPage}>
            <div className={styles.container}>
                <div className={styles.registration}>
                    <FormControl style={{width: '100%'}}>
                        <form className={styles.registrationPageForm} onSubmit={formik.handleSubmit}>
                            <h2>Sign Up</h2>
                            <FormGroup style={{marginTop: "20px"}}>
                                <TextField label="Email"
                                           variant="standard"
                                           margin="normal"
                                           size={'small'}
                                           style={{width: '100%'}}
                                           {...formik.getFieldProps('email')}
                                />
                                {
                                    formik.touched.email &&
                                    formik.errors.email &&
                                    <div style={{color: 'red'}}>{formik.errors.email}</div>
                                }
                                <FormControl variant="standard" style={{marginTop: "20px"}}>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input id="password"
                                           type={showPassword ? 'text' : 'password'}
                                           {...formik.getFieldProps('password')}
                                           endAdornment={
                                               <InputAdornment position="end" sx={{marginBottom: '13.92px'}}>
                                                   <IconButton
                                                       aria-label="toggle password visibility"
                                                       onClick={onClickPasswordHandler}
                                                       sx={{color: 'black'}}
                                                   >
                                                       {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                   </IconButton>
                                               </InputAdornment>
                                           }
                                    />
                                </FormControl>
                                {
                                    formik.touched.password &&
                                    formik.errors.password &&
                                    <div style={{color: 'red'}}>{formik.errors.password}</div>
                                }
                                <FormControl style={{marginTop: "20px"}} variant="standard">
                                    <InputLabel htmlFor="confirm">Confirm Password</InputLabel>
                                    <Input id="confirm"
                                           type={showConfirmPassword ? 'text' : 'password'}
                                           {...formik.getFieldProps('confirm')}
                                           endAdornment={
                                               <InputAdornment position="end" sx={{marginBottom: '13.92px'}}>
                                                   <IconButton
                                                       aria-label="toggle password visibility"
                                                       onClick={onClickConfirmPasswordHandler}
                                                       sx={{color: 'black'}}
                                                   >
                                                       {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                                   </IconButton>
                                               </InputAdornment>
                                           }
                                    />
                                </FormControl>
                                {
                                    formik.touched.confirm &&
                                    formik.errors.confirm &&
                                    <div style={{color: 'red'}}>{formik.errors.confirm}</div>
                                }
                            </FormGroup>
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    style={{width: '100%', borderRadius: '30px', marginTop: '60px'}}
                            >Sign Up
                            </Button>
                            <div className={styles.linkBlock}>
                                <div className={styles.text}>Already have an account?</div>
                                <NavLink to={PATH.Login} className={styles.link}>Sign In</NavLink>
                            </div>
                        </form>
                    </FormControl>
                    <ErrorSnackbar/>
                </div>
            </div>
        </div>
    );
};

//Types
type FormikErrorType = {
    email?: string
    password?: string
    confirm?: string
}