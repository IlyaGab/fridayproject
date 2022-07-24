import React from 'react';
import styles from "./profilePage.module.scss"
import {faArrowRightFromBracket, faPencil} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import avatar from "../../../assets/img/avatar.png"

import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {Navigate} from 'react-router-dom';
import {PATH} from '../Pages';

export const ProfilePage = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    if(!isLoggedIn) {
        return <Navigate to={PATH.Login}/>
    }
    return (
        <div className={styles.profilePage}>
            <div className={styles.profile}>
                <h1>Personal Information</h1>
                <img className={styles.avatar} src={avatar} alt={"avatar"} />
                <p className={styles.name}>Ivan <FontAwesomeIcon icon={faPencil} size="sm" /></p>
                <p className={styles.email}>j&johnson@gmail.com</p>
                <button className={styles.btn}><FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" /> Log out</button>
            </div>
        </div>
    );
};

