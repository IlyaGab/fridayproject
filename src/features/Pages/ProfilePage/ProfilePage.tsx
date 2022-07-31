import React from 'react';
import styles from "./profilePage.module.scss"
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import avatar from "../../../assets/img/avatar.png"
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {logoutTC} from '../LoginPage/loginPageReducer';
import {EditableSpan} from "../../../common/components/EditableSpan/EditableSpan";
import {changeInfoProfileTC} from "./profilePageReducer";
import {BackButton} from "../../../common/components/BackButton/BackButton";
import {PATH} from "../../../common/components/RoutesList/RoutersList";

export const ProfilePage = () => {
    const nameState = useAppSelector(state => state.profileReducer.name)
    const email = useAppSelector(state => state.profileReducer.email)
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)

    const dispatch = useAppDispatch()

    if (!isLoggedIn) {
        return <Navigate to={PATH.Login}/>
    }

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    const onChangeInfoProfile = (name: string) => {
        if(nameState !== name) {
            dispatch(changeInfoProfileTC(name))
        }
    }

    return (
        <div className={styles.profilePage}>
            <div className={styles.container}>
                <BackButton />
                <div className={styles.profile}>
                    <h1>Personal Information</h1>
                    <img className={styles.avatar} src={avatar} alt={"avatar"}/>
                    <EditableSpan initialName={nameState} callback={onChangeInfoProfile}
                                  className={styles.name}/>
                    <p className={styles.email}>{email}</p>
                    <button className={styles.btn} onClick={onClickHandler}><FontAwesomeIcon
                        icon={faArrowRightFromBracket} size="lg"
                    /> Log out
                    </button>
                </div>
            </div>
        </div>
    )
}