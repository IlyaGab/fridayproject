import React from 'react';
import styles from './changePasswordPage.module.scss';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {ErrorSnackbar} from '../../../common/components/ErrorSnackbar/ErrorSnackbar';
import {useFormik} from 'formik';
import {Visibility, VisibilityOff} from '@mui/icons-material';


export const ChangePasswordPage = () => {

    const [values, setValues] = React.useState<StateFormType>({
        password: '',
        showPassword: false,
    });

    const handleChange =
        (prop: keyof StateFormType) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value});
            formik.handleChange(values);
            formik.values.newPassword = values.password
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            newPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.newPassword) {
                errors.newPassword = 'Required password'
            } else if (values.newPassword.length < 7) {
                errors.newPassword = 'Invalid password'
            }
            return errors;
        },
        onSubmit: values => {
            // dispatch
            formik.resetForm();
        },
    })


    return (
        <div className={styles.changePasswordPage}>
            <div className={styles.container}>
                <div className={styles.changePassword}>
                    <FormControl style={{width: '100%'}}>
                        <form className={styles.loginPageForm} onSubmit={formik.handleSubmit}>
                            <h2>Create new password</h2>
                            <InputLabel htmlFor="password"
                                        style={{marginTop: '90px', width: '100%'}}>Password</InputLabel>
                            <Input
                                id="password"
                                style={{marginTop: '70px', width: '100%'}}
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                onBlur={formik.handleBlur}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <p className={styles.text}>Create new password and we will send you
                                further instructions to email</p>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                style={{width: '100%', borderRadius: '30px', marginTop: '40px'}}>
                                Create new password
                            </Button>
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
    newPassword?: string
}

type StateFormType = {
    password: string;
    showPassword: boolean;
}
