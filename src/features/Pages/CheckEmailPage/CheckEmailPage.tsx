import styles from './checkEmailPage.module.scss'
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import emailLogo from "../../../assets/img/email.png"
import {PATH} from "../../../common/components/RoutesList/RoutersList";
import {ReactElement} from "react";

export const CheckEmailPage = (): ReactElement => {
    const navigate = useNavigate()

    const onClickHandler = () => {
        navigate(PATH.Login)
    }

    return (
        <div className={styles.checkEmailPage}>
            <div className={styles.container}>
                <div className={styles.checkEmail}>
                    <div className={styles.checkEmailPageForm}>
                        <h2>Check Email</h2>
                        <img className={styles.logoEmail} src={emailLogo} alt="email"/>
                        <div className={styles.text}>We’ve sent an Email with instructions to
                            example@mail.com
                        </div>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            style={{width: '100%', borderRadius: '30px', marginTop: "40px"}}
                            onClick={onClickHandler}
                        >
                            Back to Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}