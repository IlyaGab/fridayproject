import React, {ReactElement, useEffect, useState} from 'react'

import socketIo from 'socket.io-client'

export const Chat = (): ReactElement => {
    console.log('Chat')
    const [message, setMessage] = useState('')

    const sendMessage = (): void => {
        console.log('sendMessage:', message)
        // socket.emit('client-message-sent', message, (answer: string) => alert(answer))
    }

    useEffect(() => {
        const socket = socketIo('https://neko-back.herokuapp.com/')

        socket.on('new-message-sent', (message: any) => alert(message))
        console.log(socket)

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <div>
            Chat
            <form>
                <input
                    value={message}
                    onChange={e => setMessage(e.currentTarget.value)}
                />
                <button type="submit" onClick={sendMessage}>
                    Send
                </button>
            </form>
        </div>
    )
}
