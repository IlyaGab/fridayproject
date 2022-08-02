import React from 'react';
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "../../../features/Pages/LoginPage/LoginPage";
import {RegistrationPage} from "../../../features/Pages/RegistrationPage/RegistrationPage";
import {
    PasswordRecoveryPage
} from "../../../features/Pages/PasswordRecoveryPage/PasswordRecoveryPage";
import {ChangePasswordPage} from "../../../features/Pages/ChangePasswordPage/ChangePasswordPage";
import {ProfilePage} from "../../../features/Pages/ProfilePage/ProfilePage";
import {CheckEmailPage} from "../../../features/Pages/CheckEmailPage/CheckEmailPage";
import {ErrorPage} from "../../../features/Pages/ErrorPage/ErrorPage";
import {PacksList} from "../../../features/Pages/PacksList/PacksList";
import {CardsList} from '../../../features/Pages/CardsList/CardsList';

export enum PATH {
    ChangePass = '/change-pass-page/*',
    Login = '/',
    ForgotPass = '/recovery-pass-page',
    Profile = '/profile-page',
    Registration = '/registration-page',
    CheckEmail = '/check-email-page',
    PacksList = '/packs-list',
    CardsList = '/cards-list',
}

export const RoutersList = () => {
    return (
        <Routes>
            <Route path={PATH.Login} element={<LoginPage/>}/>
            <Route path={PATH.Registration} element={<RegistrationPage/>}/>
            <Route path={PATH.ForgotPass} element={<PasswordRecoveryPage/>}/>
            <Route path={PATH.ChangePass} element={<ChangePasswordPage/>}/>
            <Route path={PATH.Profile} element={<ProfilePage/>}/>
            <Route path={PATH.CheckEmail} element={<CheckEmailPage/>}/>
            <Route path={PATH.PacksList} element={<PacksList/>}/>
            <Route path={PATH.CardsList} element={<CardsList/>}/>
            <Route path={'/*'} element={<ErrorPage/>}/>
        </Routes>
    )
}