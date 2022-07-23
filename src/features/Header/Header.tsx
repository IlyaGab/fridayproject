import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../Pages/Pages';
import './_header.scss'

const Header = () => {
    return (
        <div className='navList'>
            <div>Navigation</div>
                <NavLink className='navLink' to={PATH.ChangePass}>Change your password</NavLink>
                <NavLink className='navLink' to={PATH.Login}>Login</NavLink>
                <NavLink className='navLink' to={PATH.RecoveryPass}>Recovery password</NavLink>
                <NavLink className='navLink' to={PATH.Profile}>Profile</NavLink>
                <NavLink className='navLink' to={PATH.Registration}>Registration</NavLink>
                <NavLink className='navLink' to={PATH.Test}>Test</NavLink>
        </div>
    );
};

export default Header;