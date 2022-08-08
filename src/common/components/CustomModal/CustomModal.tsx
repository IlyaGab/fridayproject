import React, {ReactNode, useState} from 'react';
import styles from './customModal.module.scss'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: '2px',
    bgcolor: 'background.paper',
    boxShadow: 24,
}

type PropsType = {
    buttonName?: string
    title: string
    children: ReactNode
}

export const CustomModal: React.FC<PropsType> = ({buttonName, title, children}) => {
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Button
                variant={'contained'}
                color={'primary'}
                style={{borderRadius: '30px', padding: '5px 30px'}}
                onClick={handleOpen}
            >
                {buttonName}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.header}>
                        <div className={styles.title}>{title}</div>
                        <IconButton sx={{color: 'black', padding: '0'}} onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div className={styles.content}>
                        {children}
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
