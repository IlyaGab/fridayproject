import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {Navigate} from 'react-router-dom';
import {PATH} from '../Pages';

export const ChangePasswordPage = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    if(!isLoggedIn) {
        return <Navigate to={PATH.Login}/>
    }
    return (
        <div>
            ChangePasswordPage
        </div>
    );
};

