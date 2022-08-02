import React from 'react';
import styles from "./NavLinkList.module.scss";
import {NavLink} from "react-router-dom";
import {PATH} from "../RoutesList/RoutersList";

export const NavLinkList = () => {
    return (
        <div className={styles.navList}>
            <NavLink className={styles.navLink} to={PATH.ChangePass}>Change your
                password</NavLink>
            <NavLink className={styles.navLink} to={PATH.Profile}>Profile</NavLink>
            <NavLink className={styles.navLink} to={PATH.CheckEmail}>Check Email</NavLink>
            <NavLink className={styles.navLink} to={PATH.Pack}>Pack</NavLink>
            <NavLink className={styles.navLink} to={'/*'}>Error 404</NavLink>
        </div>
    )
}