import React, {ChangeEvent, ReactElement} from 'react'

import {faArrowRightFromBracket, faCamera} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Navigate} from 'react-router-dom'

import defaultAvatar from '../../../../assets/img/default-avatar.png'
import {BackButton} from '../../../../common/components/BackButton/BackButton'
import {EditableSpan} from '../../../../common/components/EditableSpan/EditableSpan'
import {PATH} from '../../../../common/components/RoutesList/RoutersList'
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../../common/hooks/useAppSelector'
import {logoutTC} from '../LoginPage/loginPageReducer'

import styles from './profilePage.module.scss'
import {changeInfoProfileTC} from './profilePageReducer'

export const ProfilePage = (): ReactElement => {
    const dispatch = useAppDispatch()

    const nameState = useAppSelector(state => state.profile.name)
    const email = useAppSelector(state => state.profile.email)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const avatar = useAppSelector(state => state.profile.avatar)

    if (!isLoggedIn) {
        return <Navigate to={PATH.Login} />
    }

    const onClickHandler = (): void => {
        dispatch(logoutTC())
    }

    const onChangeInfoProfile = (name: string): void => {
        if (nameState !== name) {
            dispatch(changeInfoProfileTC(name, avatar))
        }
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            const maxFileSize = 4000000

            if (file.size < maxFileSize) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(changeInfoProfileTC(nameState, file64))
                })
            } else {
                // eslint-disable-next-line no-console
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void): void => {
        const reader = new FileReader()

        reader.onloadend = () => {
            const file64 = reader.result as string

            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className={styles.profilePage}>
            <div className={styles.container}>
                <BackButton path={PATH.PacksList} title="Back to Packs List" />
                <div className={styles.profile}>
                    <h1>Personal Information</h1>
                    <div className={styles.avatar}>
                        <img
                            className={styles.photoAvatar}
                            src={avatar || defaultAvatar}
                            alt="avatar"
                        />
                        <div className={styles.btnChangeAvatar}>
                            <label htmlFor="changeAvatar">
                                <input
                                    type="file"
                                    id="changeAvatar"
                                    accept="image/*"
                                    onChange={uploadHandler}
                                />
                                <FontAwesomeIcon icon={faCamera} size="lg" />
                            </label>
                        </div>
                    </div>
                    <EditableSpan
                        initialName={nameState}
                        callback={onChangeInfoProfile}
                        className={styles.name}
                    />
                    <p className={styles.email}>{email}</p>
                    <button type="button" className={styles.btn} onClick={onClickHandler}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" /> Log
                        out
                    </button>
                </div>
            </div>
        </div>
    )
}
