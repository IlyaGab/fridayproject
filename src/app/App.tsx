import React, {useEffect} from 'react';
import Header from '../features/Header/Header';
import {PATH} from '../features/Pages/Pages';
import './App.scss';
import {useDispatch, useSelector} from 'react-redux';
import {initializeAppTC, RequestStatusType} from './appReducer';
import {CircularProgress} from '@mui/material';
import {AppRootStateType} from './store';
import {LoginPage} from '../features/Pages/LoginPage/LoginPage';
import {PasswordRecoveryPage} from '../features/Pages/PasswordRecoveryPage/PasswordRecoveryPage';
import {RegistartionPage} from '../features/Pages/RegistrationPage/RegistartionPage';
import {Routes, Route} from 'react-router-dom';
import {ChangePasswordPage} from '../features/Pages/ChangePasswordPage/ChangePasswordPage';
import {ProfilePage} from '../features/Pages/ProfilePage/ProfilePage';
import {TestPage} from '../features/Pages/TestPage/TestPage';
import {ErrorPage} from '../features/Pages/ErrorPage/ErrorPage';





function App() {

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.appReducer.isInitialized)
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.appReducer.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(()=> {
        // @ts-ignore
        dispatch(initializeAppTC())
    },[dispatch])

    //
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            {isLoggedIn && <Header/>}
            <Routes>
                <Route path={PATH.Login} element={<LoginPage/>}/>
                <Route path={PATH.Registration} element={<RegistartionPage/>}/>
                <Route path={PATH.RecoveryPass} element={<PasswordRecoveryPage/>}/>
                <Route path={PATH.ChangePass} element={<ChangePasswordPage/>}/>
                <Route path={PATH.Profile} element={<ProfilePage/>}/>
                <Route path={PATH.Test} element={<TestPage/>}/>
                <Route path={'/*'} element={<ErrorPage/>}/>
            </Routes>

            {status === 'loading' && <CircularProgress/>}

        </div>
    );
}

export default App;
