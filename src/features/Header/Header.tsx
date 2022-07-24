import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../Pages/Pages';
import classes from './header.module.scss'


const Header = () => {



    return (
        <div className={classes.navList}>
            <NavLink className={classes.navLink} to={PATH.ChangePass}>Change your password</NavLink>
            <NavLink className={classes.navLink} to={PATH.Profile}>Profile</NavLink>
            <NavLink className={classes.navLink} to={PATH.Test}>Test</NavLink>
            <NavLink className={classes.navLink} to={'/*'}>Error 404</NavLink>
        </div>
);
};

export default Header;