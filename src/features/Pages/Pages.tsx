import React from 'react';
import {Route, Routes } from 'react-router-dom';
import {ChangePasswordPage} from './ChangePasswordPage/ChangePasswordPage';
import {ErrorPage} from './ErrorPage/ErrorPage';
import {LoginPage} from './LoginPage/LoginPage';
import {PasswordRecoveryPage} from './PasswordRecoveryPage/PasswordRecoveryPage';
import {ProfilePage} from './ProfilePage/ProfilePage';
import {RegistartionPage} from './RegistrationPage/RegistartionPage';
import {TestPage} from './TestPage/TestPage';

export const PATH = {
    ChangePass:'/change-pass-page',
    Login:'/login-page',
    RecoveryPass: '/recovery-pass-page',
    Profile: '/profile-page',
    Registration: '/registration-page',
    Test: '/test-page'
}

const Pages = () => {
    return (
        <div >
            <Routes>
               <Route path={PATH.ChangePass} element={<ChangePasswordPage/>}/>
                <Route path={'/*'} element={<ErrorPage/>}/>
                <Route path={PATH.Login} element={<LoginPage/>}/>
                <Route path={PATH.RecoveryPass} element={<PasswordRecoveryPage/>}/>
                <Route path={PATH.Profile} element={<ProfilePage/>}/>
                <Route path={PATH.Registration} element={<RegistartionPage/>}/>
                <Route path={PATH.Test} element={<TestPage/>}/>
            </Routes>
        </div>
    );
};

export default Pages;