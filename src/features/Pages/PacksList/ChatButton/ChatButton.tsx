import React, {ReactElement, useState} from 'react'

import ChatIcon from '@mui/icons-material/Chat'

import {Chat} from './Chat/Chat'
import styles from './chatButton.module.scss'

export const ChatButton = (): ReactElement => {
    const [isShowChat, setIsShowChat] = useState(false)

    const onButtonHandler = (): void => {
        setIsShowChat(false)
    }

    return (
        <div style={{position: 'relative'}}>
            <button
                type="button"
                className={styles.chatButton}
                onClick={() => setIsShowChat(true)}
            >
                {!isShowChat && (
                    <ChatIcon style={{width: '35px', height: '35px', color: '#1976d2'}} />
                )}
            </button>
            {isShowChat && <Chat closeChat={onButtonHandler} />}
        </div>
    )
}
