import React from 'react';
import styles from './header.module.scss'
import {useAppSelector} from "../../common/hooks/useAppSelector";
import avatar from "../../assets/img/avatar.png";
// import cards from "../../assets/img/logo-cards.png";
import Button from "@mui/material/Button";

export const Header = () => {
    const name = useAppSelector(state => state.profileReducer.name)
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <img className={styles.logo} src={'#'} alt="logo-cards"/>
                    {isLoggedIn
                        ? <div className={styles.profileInfo}>
                            <p className={styles.name}>{name}</p>
                            <img className={styles.avatar} src={avatar} alt={"avatar"}/>
                        </div>
                        : <div className={styles.btn}>
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    style={{
                                        maxWidth: '113px',
                                        width: "100%",
                                        height: '36px',
                                        borderRadius: '30px'
                                    }}
                            >Sign In
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}