import React, {ChangeEvent, ReactElement} from "react";
import styles from "./profilePage.module.scss"
import {faArrowRightFromBracket, faCamera} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import defaultAvatar from "../../../assets/img/avatar.png"
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {logoutTC} from "../LoginPage/loginPageReducer";
import {EditableSpan} from "../../../common/components/EditableSpan/EditableSpan";
import {changeInfoProfileTC} from "./profilePageReducer";
import {BackButton} from "../../../common/components/BackButton/BackButton";
import {PATH} from "../../../common/components/RoutesList/RoutersList";

export const ProfilePage = (): ReactElement => {
    const dispatch = useAppDispatch()

    const nameState = useAppSelector(state => state.profileReducer.name)
    const email = useAppSelector(state => state.profileReducer.email)
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)
    const avatar = useAppSelector(state => state.profileReducer.avatar)

    if (!isLoggedIn) {
        return <Navigate to={PATH.Login}/>
    }

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    const onChangeInfoProfile = (name: string) => {
        if (nameState !== name) {
            dispatch(changeInfoProfileTC(name, avatar))
        }
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)

            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    console.log('file64: ', file64)

                    dispatch(changeInfoProfileTC(nameState, file64))

                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className={styles.profilePage}>
            <div className={styles.container}>
                <BackButton/>
                <div className={styles.profile}>
                    <h1>Personal Information</h1>
                    <div className={styles.avatar}>
                        <img className={styles.photoAvatar} src={avatar || defaultAvatar} alt={"avatar"}/>
                        <div className={styles.btnChangeAvatar}>
                            <input type={"file"} id="changeAvatar" accept="image/*" onChange={uploadHandler} />
                            <label htmlFor="changeAvatar">
                                <FontAwesomeIcon icon={faCamera} size="lg"/>
                            </label>
                        </div>
                    </div>
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