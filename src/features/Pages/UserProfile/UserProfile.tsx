import React, {ReactElement, useEffect} from 'react'

import defaultAvatar from '../../../assets/img/default-avatar.png'
import {BackButton} from '../../../common/components/BackButton/BackButton'
import {useAppDispatch} from '../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../common/hooks/useAppSelector'
import styles from '../Auth/ProfilePage/profilePage.module.scss'

import {getUserInfoTC} from './userProfileReducer'

export const UserProfile = (): ReactElement => {
    const dispatch = useAppDispatch()

    const userInfo = useAppSelector(state => state.userProfile)

    useEffect(() => {
        dispatch(getUserInfoTC())
    }, [dispatch])

    return (
        <div className={styles.profilePage}>
            <div className={styles.container}>
                <BackButton />
                <div className={styles.profile}>
                    <h1>{userInfo.name}</h1>
                    <div className={styles.avatar}>
                        <img
                            className={styles.photoAvatar}
                            src={userInfo.avatar || defaultAvatar}
                            alt="avatar"
                        />
                    </div>
                    <p className={styles.email}>{userInfo.email}</p>
                </div>
            </div>
        </div>
    )
}
