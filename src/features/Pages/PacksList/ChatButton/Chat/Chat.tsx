import React, {ReactElement, useEffect, useRef, useState, KeyboardEvent} from 'react'

import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import {Navigate} from 'react-router-dom'

import defaultAvatar from '../../../../../assets/img/default-avatar.png'
import {PATH} from '../../../../../common/components/RoutesList/RoutersList'
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../../../common/hooks/useAppSelector'

import styles from './chat.module.scss'
import {createConnection, destroyConnection, sendMessage} from './chatReducer'

export const Chat = ({closeChat}: ChatPropsType): ReactElement => {
    const dispatch = useAppDispatch()

    const messages = useAppSelector(state => state.chat.messages)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

    const [message, setMessage] = useState('')

    const myRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        dispatch(createConnection())

        return () => {
            dispatch(destroyConnection())
        }
    }, [dispatch])

    useEffect(() => {
        myRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    if (!isLoggedIn) {
        return <Navigate to={PATH.Login} />
    }

    const sendMessageHandler = (): any => {
        dispatch(sendMessage(message))
        setMessage('')
    }

    const onButtonHandler = (): void => {
        closeChat()
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            dispatch(sendMessage(message))
            setMessage('')
        }
    }

    return (
        <div className={styles.chatPage}>
            <div className={styles.header}>
                <h2>Chat</h2>
                <button type="button" onClick={onButtonHandler}>
                    <CloseIcon />
                </button>
            </div>
            <div className={styles.chatBlock}>
                {messages.map(message => {
                    return (
                        <div key={message._id} className={styles.messageBlock}>
                            <img
                                src={message.user.avatar || defaultAvatar}
                                alt="avatar"
                            />
                            <div className={styles.message}>
                                <b>{message.user.name}</b>
                                <p>{message.message}</p>
                            </div>
                        </div>
                    )
                })}
                <div ref={myRef} />
            </div>
            <div className={styles.sendBlock}>
                <input
                    value={message}
                    onChange={e => setMessage(e.currentTarget.value)}
                    onKeyPress={onKeyPressHandler}
                />
                <button type="submit" onClick={sendMessageHandler}>
                    <SendIcon />
                </button>
            </div>
        </div>
    )
}

type ChatPropsType = {
    closeChat: () => void
}
