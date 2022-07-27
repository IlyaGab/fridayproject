import React, {useEffect} from 'react';
import {Header} from '../features/Header/Header';
import './App.scss';
import { initializeAppTC } from './appReducer';
import { LoginPage } from '../features/Pages/LoginPage/LoginPage';
import { PasswordRecoveryPage } from '../features/Pages/PasswordRecoveryPage/PasswordRecoveryPage';
import { NavLink, Route, Routes } from 'react-router-dom';
import { ChangePasswordPage } from '../features/Pages/ChangePasswordPage/ChangePasswordPage';
import { ProfilePage } from '../features/Pages/ProfilePage/ProfilePage';
import { ErrorPage } from '../features/Pages/ErrorPage/ErrorPage';
import { RegistrationPage } from '../features/Pages/RegistrationPage/RegistrationPage';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { CircularProgressComponent } from '../common/components/CircularProgress/CircularProgress';
import styles from "../features/Header/header.module.scss";
import { CheckEmailPage } from '../features/Pages/CheckEmailPage/CheckEmailPage';

export enum PATH {
    ChangePass = '/change-pass-page/*',
    Login = '/',
    ForgotPass = '/recovery-pass-page',
    Profile = '/profile-page',
    Registration = '/registration-page',
    CheckEmail = '/check-email-page',
}

export const App = () => {
    const isInitialized = useAppSelector(state => state.appReducer.isInitialized)
    const status = useAppSelector(state => state.appReducer.status)

    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(initializeAppTC())
    },[dispatch])

    if (!isInitialized) {
        return <CircularProgressComponent />
    }

    return (
        <>
            {status !== 'loading' ? <div className="App">
               <Header />
                <Routes>
                    <Route path={PATH.Login} element={<LoginPage />} />
                    <Route path={PATH.Registration} element={<RegistrationPage />} />
                    <Route path={PATH.ForgotPass} element={<PasswordRecoveryPage />} />
                    <Route path={PATH.ChangePass} element={<ChangePasswordPage />} />
                    <Route path={PATH.Profile} element={<ProfilePage />} />
                    <Route path={PATH.CheckEmail} element={<CheckEmailPage/>}/>
                    <Route path={'/*'} element={<ErrorPage />} />
                </Routes>
                    <div className={styles.navList}>
                        <NavLink className={styles.navLink} to={PATH.ChangePass}>Change your password</NavLink>
                        <NavLink className={styles.navLink} to={PATH.Profile}>Profile</NavLink>
                        <NavLink className={styles.navLink} to={PATH.CheckEmail}>Check Email</NavLink>
                        <NavLink className={styles.navLink} to={'/*'}>Error 404</NavLink>
                    </div>
            </div>
                : <CircularProgressComponent />}
        </>

    )
}