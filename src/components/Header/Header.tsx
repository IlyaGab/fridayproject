import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../Pages/Pages';
import c from './Header.module.css'

const Header = () => {
    return (
        <div className={c.navList}>
                <NavLink className={c.navLink} to={PATH.ChangePass}>Change your password</NavLink>
                <NavLink className={c.navLink} to={PATH.Login}>Login</NavLink>
                <NavLink className={c.navLink} to={PATH.RecoveryPass}>Recovery password</NavLink>
                <NavLink className={c.navLink} to={PATH.Profile}>Profile</NavLink>
                <NavLink className={c.navLink} to={PATH.Registration}>Registration</NavLink>
                <NavLink className={c.navLink} to={PATH.Test}>Test</NavLink>
        </div>
    );
};

export default Header;