import {chatAPI, MessageType} from '../../../../../api/chatAPI'
import {AppThunkType} from '../../../../../app/store'

const initialState = {
    messages: [] as Array<MessageType>,
    userId: '',
}

export const chatReducer = (
    state: InitialStateType = initialState,
    action: ChatActionType,
): InitialStateType => {
    switch (action.type) {
        case 'CHAT/MESSAGE-RECEIVED':
            return {
                ...state,
                messages: [...action.payload.messages],
            }
        case 'CHAT/NEW-MESSAGE-RECEIVED':
            return {
                ...state,
                messages: [...state.messages, action.payload.message],
            }
        case 'CHAT/SET-USER-ID':
            return {
                ...state,
                userId: action.payload.id,
            }
        default:
            return state
    }
}

const messageReceived = (messages: Array<MessageType>) =>
    ({
        type: 'CHAT/MESSAGE-RECEIVED',
        payload: {
            messages,
        },
    } as const)

const newMessageReceived = (message: MessageType) =>
    ({
        type: 'CHAT/NEW-MESSAGE-RECEIVED',
        payload: {
            message,
        },
    } as const)

const setUserid = (id: string) =>
    ({
        type: 'CHAT/SET-USER-ID',
        payload: {
            id,
        },
    } as const)

export const createConnection = (): AppThunkType => (dispatch, getState) => {
    chatAPI.createConnection(
        getState().chat.userId,
        getState().profile.name,
        getState().profile.avatar,
        (id: string) => dispatch(setUserid(id)),
    )
    chatAPI.subscribe(
        (messages: Array<MessageType>) => {
            dispatch(messageReceived(messages))
        },
        (message: MessageType) => {
            dispatch(newMessageReceived(message))
        },
    )
}

export const destroyConnection = (): AppThunkType => () => {
    chatAPI.destroyConnection()
}

export const sendMessage =
    (message: string): AppThunkType =>
    () => {
        chatAPI.sendMessage(message)
    }

// Types
export type ChatActionType =
    | ReturnType<typeof messageReceived>
    | ReturnType<typeof newMessageReceived>
    | ReturnType<typeof setUserid>

export type InitialStateType = typeof initialState
