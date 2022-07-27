import React from 'react';
import styles from './ErrorPage.module.scss'
import ufo from '../../../assets/img/UFO.svg'
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../app/App';
import {useAppSelector} from '../../../common/hooks/useAppSelector';

export const ErrorPage = () => {
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)
    const navigate = useNavigate()
    const onClickHandler = () => {
        navigate(isLoggedIn ? PATH.Profile : PATH.Login)
    }

    return (
        <div className={styles.errorPage}>
            <div className={styles.container}>
                <div className={styles.error}>
                    <h2 className={styles.errorTitle}>Oops! Page not found</h2>
                    <img className={styles.icon} src={ufo} alt="error-icon"/>
                    <Button variant={'contained'}
                            color={'primary'}
                            onClick={onClickHandler}
                            style={{width: '100%', borderRadius: '30px'}}
                    >Go home
                    </Button>
                </div>
            </div>
        </div>
    );
};

