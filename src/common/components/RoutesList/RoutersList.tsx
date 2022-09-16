import React, {ReactElement} from 'react'

import {Route, Routes} from 'react-router-dom'

import {ChangePasswordPage} from '../../../features/Pages/Auth/ChangePasswordPage/ChangePasswordPage'
import {CheckEmailPage} from '../../../features/Pages/Auth/CheckEmailPage/CheckEmailPage'
import {LoginPage} from '../../../features/Pages/Auth/LoginPage/LoginPage'
import {PasswordRecoveryPage} from '../../../features/Pages/Auth/PasswordRecoveryPage/PasswordRecoveryPage'
import {ProfilePage} from '../../../features/Pages/Auth/ProfilePage/ProfilePage'
import {RegistrationPage} from '../../../features/Pages/Auth/RegistrationPage/RegistrationPage'
import {CardsList} from '../../../features/Pages/CardsList/CardsList'
import {LearnPage} from '../../../features/Pages/Learn/LearnPage'
import {PacksList} from '../../../features/Pages/PacksList/PacksList'
import {UserProfilePage} from '../../../features/Pages/UserProfile/UserProfile/UserProfilePage'
import {UsersList} from '../../../features/Pages/UserProfile/UsersList/UsersList'
import {ErrorPage} from '../ErrorPage/ErrorPage'

export enum PATH {
    ChangePass = '/change-pass-page/*',
    Login = '/',
    ForgotPass = '/recovery-pass-page',
    Profile = '/profile-page',
    Registration = '/registration-page',
    CheckEmail = '/check-email-page',
    PacksList = '/packs-list',
    CardsList = '/cards-list',
    Learn = '/learn',
    UserProfile = '/user-profile',
    UsersList = '/users-list',
}

export const RoutersList = (): ReactElement => {
    return (
        <Routes>
            <Route path={PATH.Login} element={<LoginPage />} />
            <Route path={PATH.Registration} element={<RegistrationPage />} />
            <Route path={PATH.ForgotPass} element={<PasswordRecoveryPage />} />
            <Route path={PATH.ChangePass} element={<ChangePasswordPage />} />
            <Route path={PATH.Profile} element={<ProfilePage />} />
            <Route path={PATH.CheckEmail} element={<CheckEmailPage />} />
            <Route path={PATH.PacksList} element={<PacksList />} />
            <Route path={PATH.CardsList} element={<CardsList />} />
            <Route path={PATH.Learn} element={<LearnPage />} />
            <Route path={PATH.UserProfile} element={<UserProfilePage />} />
            <Route path={PATH.UsersList} element={<UsersList />} />
            <Route path={'/*'} element={<ErrorPage />} />
        </Routes>
    )
}
