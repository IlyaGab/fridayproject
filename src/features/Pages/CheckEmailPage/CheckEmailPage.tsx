import styles from './checkEmailPage.module.scss'
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../app/App';
import email from "../../../assets/img/email.png"

export const CheckEmailPage = () => {
    const navigate = useNavigate()

    const onClick = () => {
        navigate(PATH.Login)
    }

    return (
        <div className={styles.checkEmailPage}>
            <div className={styles.container}>
                <div className={styles.checkEmail}>
                    <div className={styles.checkEmailPageForm}>
                        <h2>Check Email</h2>
                        <img className={styles.logoEmail} src={email} alt="email"/>
                        <div className={styles.text}>We’ve sent an Email with instructions to
                            example@mail.com
                        </div>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            style={{width: '100%', borderRadius: '30px', marginTop: "40px"}}
                            onClick={onClick}
                        >
                            Back to Login
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}