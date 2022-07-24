import React from 'react';
import {Navigate} from 'react-router-dom';
import {PATH} from '../Pages';
import {useAppSelector} from '../../../common/hooks/useAppSelector';

export const ErrorPage = () => {
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)
    if(!isLoggedIn) {
        return <Navigate to={PATH.Login}/>
    }
    return (
        <div>
            Error 404
        </div>
    );
};

