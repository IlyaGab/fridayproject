import React from 'react';
import {Navigate} from 'react-router-dom';
import { PATH } from '../../../app/App';
import {useAppSelector} from '../../../common/hooks/useAppSelector';

export const ChangePasswordPage = () => {
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)
    if(!isLoggedIn) {
        return <Navigate to={PATH.Login}/>
    }
    return (
        <div>
            ChangePasswordPage
        </div>
    );
};

