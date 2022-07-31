import React from 'react';
import styles from './header.module.scss'
import {useAppSelector} from '../../common/hooks/useAppSelector';
import avatar from '../../assets/img/avatar.png';
import logo from '../../assets/img/IT-INC-Logo.svg';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';
import {PATH} from "../../common/components/RoutesList/RoutersList";

export const Header = () => {
    const name = useAppSelector(state => state.profileReducer.name)
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <NavLink to={isLoggedIn ? PATH.Profile : PATH.Login}>
                        <img className={styles.logo} src={logo} alt="IT-INC-Logo"/>
                    </NavLink>
                    {isLoggedIn
                        ? <div className={styles.profileInfo}>
                            <p className={styles.name}>{name}</p>
                            <NavLink to={PATH.Profile}><img className={styles.avatar} src={avatar}
                                                            alt={'avatar'}/></NavLink>
                        </div>
                        : <div className={styles.btn}>
                            <NavLink to={PATH.Login} style={{textDecoration: 'none'}}>
                                <Button type={'submit'}
                                        variant={'contained'}
                                        color={'primary'}
                                        style={{
                                            maxWidth: '150px',
                                            width: '100%',
                                            height: '36px',
                                            borderRadius: '30px',
                                        }}
                                >Sign In
                                </Button>
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}