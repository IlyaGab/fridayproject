import React, {ReactElement} from 'react'

import Button from '@mui/material/Button'
import {NavLink} from 'react-router-dom'

import defaultAvatar from '../../assets/img/default-avatar.png'
import logo from '../../assets/img/header-logo.png'
import {PATH} from '../../common/components/RoutesList/RoutersList'
import {useAppSelector} from '../../common/hooks/useAppSelector'

import styles from './header.module.scss'

export const Header = (): ReactElement => {
    const name = useAppSelector(state => state.profile.name)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const avatar = useAppSelector(state => state.profile.avatar)

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <NavLink to={isLoggedIn ? PATH.PacksList : PATH.Login}>
                        <img className={styles.logo} src={logo} alt="cards-logo" />
                    </NavLink>
                    {isLoggedIn ? (
                        <div className={styles.profileInfo}>
                            <p className={styles.name}>{name}</p>
                            <NavLink to={PATH.Profile}>
                                <img
                                    className={styles.avatar}
                                    src={avatar || defaultAvatar}
                                    alt="avatar"
                                />
                            </NavLink>
                        </div>
                    ) : (
                        <div className={styles.btn}>
                            <NavLink to={PATH.Login} style={{textDecoration: 'none'}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        maxWidth: '150px',
                                        width: '100%',
                                        height: '36px',
                                        borderRadius: '30px',
                                    }}
                                >
                                    Sign In
                                </Button>
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
