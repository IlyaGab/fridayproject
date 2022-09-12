import React, {ReactElement} from 'react'

import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'

import errorIcon from '../../../assets/img/error.svg'
import {useAppSelector} from '../../hooks/useAppSelector'
import {PATH} from '../RoutesList/RoutersList'

import styles from './errorPage.module.scss'

export const ErrorPage = (): ReactElement => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

    const navigate = useNavigate()

    const onClickHandler = (): void => {
        navigate(isLoggedIn ? PATH.Profile : PATH.Login)
    }

    return (
        <div className={styles.errorPage}>
            <div className={styles.container}>
                <div className={styles.error}>
                    <h2 className={styles.errorTitle}>Oops! Page not found</h2>
                    <img className={styles.icon} src={errorIcon} alt="error-icon" />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClickHandler}
                        style={{width: '100%', borderRadius: '30px'}}
                    >
                        Go home
                    </Button>
                </div>
            </div>
        </div>
    )
}
