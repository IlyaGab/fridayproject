import React, {ReactElement, useEffect} from 'react'

import defaultAvatar from '../../../../assets/img/default-avatar.png'
import {BackButton} from '../../../../common/components/BackButton/BackButton'
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../../common/hooks/useAppSelector'

import styles from './userProfilePage.module.scss'
import {getUserInfoTC} from './userProfileReducer'

export const UserProfilePage = (): ReactElement => {
    const dispatch = useAppDispatch()

    const userInfo = useAppSelector(state => state.userProfile)

    useEffect(() => {
        dispatch(getUserInfoTC())
    }, [dispatch])

    return (
        <div className={styles.userProfilePage}>
            <div className={styles.container}>
                <BackButton />
                <div className={styles.userProfile}>
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
