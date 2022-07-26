import styles from './checkEmailPage.module.scss'
import { Button, FormControl, FormGroup } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { PATH } from '../Pages';
import { setIsSendAC } from '../PasswordRecoveryPage/passwordRecoveryPageReducer';
import { useDispatch } from 'react-redux';

export const CheckEmailPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onClick = () => {
        navigate(PATH.Login)
        dispatch(setIsSendAC(false))
    }

    return (
        <div className={styles.checkEmailPageContainer}>
            <FormControl>
                <form className={styles.checkEmailPageForm} >
                    <h2>IMAGE</h2>
                    <FormGroup>
                        <div className={styles.signInContainer}>
                        <div className={styles.text}>We’ve sent an Email with instructions to example@mail.com</div>
                    </div>
                    </FormGroup>
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        style={{ width: '347px', height: '36px', borderRadius: '30px' }}
                        onClick={onClick}
                        >
                        Back to Login
                    </Button>
                </form>
            </FormControl>
        </div>
    );
};
