import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../Pages/Pages';
import classes from './header.module.scss'

const Header = () => {
    return (
        <div className={classes.navList}>
            <div>Navigation</div>
                <NavLink className={classes.navLink} to={PATH.ChangePass}>Change your password</NavLink>
                <NavLink className={classes.navLink}  to={PATH.Login}>Login</NavLink>
                <NavLink className={classes.navLink}  to={PATH.RecoveryPass}>Recovery password</NavLink>
                <NavLink className={classes.navLink}  to={PATH.Profile}>Profile</NavLink>
                <NavLink className={classes.navLink}  to={PATH.Registration}>Registration</NavLink>
                <NavLink className={classes.navLink}  to={PATH.Test}>Test</NavLink>
        </div>
    );
};

export default Header;