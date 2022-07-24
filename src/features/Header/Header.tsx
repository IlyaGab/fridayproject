import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../Pages/Pages';
import classes from './header.module.scss'
import {Button} from '@mui/material';
import {logoutTC} from '../Pages/LoginPage/loginPageReducer';
import {useDispatch} from 'react-redux';



const Header = () => {


    const dispatch = useDispatch()
    const onClickHandler = () => {
        // @ts-ignore
        dispatch(logoutTC())
    }
    return (
        <div className={classes.navList}>
            <Button color="inherit" onClick={onClickHandler}>Log out</Button>
            <NavLink className={classes.navLink} to={PATH.ChangePass}>Change your password</NavLink>
            <NavLink className={classes.navLink} to={PATH.Profile}>Profile</NavLink>
            <NavLink className={classes.navLink} to={PATH.Test}>Test</NavLink>
            <NavLink className={classes.navLink} to={'/*'}>Error 404</NavLink>
        </div>
);
};

export default Header;