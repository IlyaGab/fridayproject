import React, {ReactNode} from 'react';
import styles from './customModal.module.scss'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
}

type PropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    // handleCloseOperation?: () => void
    handleOperation: () => void
    modalTitle: string
    children: ReactNode
    buttonTitle: string
}

export const CustomModal: React.FC<PropsType> = React.memo((props) => {
    const {
        isModalOpen,
        setIsModalOpen,
        handleOperation,
        modalTitle,
        children,
        buttonTitle
    } = props

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleButton = () => {
        if (buttonTitle === 'Save') {
            handleOperation()
            setIsModalOpen(false)
        } else {
            handleOperation()
        }
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
        >
            <Box sx={style}>
                <div className={styles.modalHeader}>
                    <div className={styles.modalTitle}>{modalTitle}</div>
                    <IconButton aria-label="close" onClick={handleModalClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <hr/>
                <div className={styles.modalContent}>
                    {children}
                </div>
                <div className={styles.modalButtons}>
                    <Button
                        variant="contained"
                        onClick={handleModalClose}
                        className={styles.modalButton}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleButton}
                        className={styles.modalButton}
                        color={buttonTitle === 'Delete' ? 'error' : 'primary'}
                    >
                        {buttonTitle}
                    </Button>
                </div>
            </Box>
        </Modal>
    )
})

