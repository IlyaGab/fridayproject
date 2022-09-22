import socketIo from 'socket.io-client'

export const chatAPI = {
    socket: null as null | any,
    createConnection(
        chatUserId: string,
        name: string,
        _id: string,
        setUserid: (id: string) => void,
    ) {
        this.socket = socketIo('https://neko-back.herokuapp.com/')
        this.socket?.emit('client-name-sent', name, setUserid)
        this.socket?.emit('init', chatUserId)
    },
    subscribe(
        initMessagesHandler: (messages: Array<MessageType>) => void,
        newMessageSentHandler: (message: MessageType) => void,
    ) {
        this.socket?.on('init-messages-published', initMessagesHandler)
        this.socket?.on('new-message-sent', newMessageSentHandler)
    },
    sendMessage(messageText: string) {
        this.socket?.emit('client-message-sent', messageText)
    },
    destroyConnection() {
        this.socket?.disconnect()
        this.socket = null
    },
}

// Types
export type MessageType = {
    _id: string
    message: string
    user: {
        _id: string
        name: string
        avatar: string
    }
}
