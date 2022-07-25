import React, {useEffect} from 'react';
import {Header} from '../features/Header/Header';
import {PATH} from '../features/Pages/Pages';
import './App.scss';
import {initializeAppTC} from './appReducer';
import {CircularProgress} from '@mui/material';
import {LoginPage} from '../features/Pages/LoginPage/LoginPage';
import {PasswordRecoveryPage} from '../features/Pages/PasswordRecoveryPage/PasswordRecoveryPage';
import {NavLink, Route, Routes} from 'react-router-dom';
import {ChangePasswordPage} from '../features/Pages/ChangePasswordPage/ChangePasswordPage';
import {ProfilePage} from '../features/Pages/ProfilePage/ProfilePage';
import {TestPage} from '../features/Pages/TestPage/TestPage';
import {ErrorPage} from '../features/Pages/ErrorPage/ErrorPage';
import {RegistrationPage} from '../features/Pages/RegistrationPage/RegistrationPage';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import classes from "../features/Header/header.module.scss";

function App() {
    const isInitialized = useAppSelector(state => state.appReducer.isInitialized)
    const status = useAppSelector(state => state.appReducer.status)
    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(initializeAppTC())
    },[dispatch])


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={PATH.Login} element={<LoginPage/>}/>
                <Route path={PATH.Registration} element={<RegistrationPage/>}/>
                <Route path={PATH.RecoveryPass} element={<PasswordRecoveryPage/>}/>
                <Route path={PATH.ChangePass} element={<ChangePasswordPage/>}/>
                <Route path={PATH.Profile} element={<ProfilePage/>}/>
                <Route path={PATH.Test} element={<TestPage/>}/>
                <Route path={'/*'} element={<ErrorPage/>}/>
            </Routes>
            {status === 'loading' && <CircularProgress/>}

            <div className={classes.navList}>
                <NavLink className={classes.navLink} to={PATH.ChangePass}>Change your password</NavLink>
                <NavLink className={classes.navLink} to={PATH.Profile}>Profile</NavLink>
                <NavLink className={classes.navLink} to={PATH.Test}>Test</NavLink>
                <NavLink className={classes.navLink} to={'/*'}>Error 404</NavLink>
            </div>

        </div>
    );
}

export default App;
