import {UserResponseType} from './authAPI'
import {instance} from './istanceSettings'

export const profileAPI = {
    changeInfo(name: string, avatar: string) {
        return instance.put<ChangeInfoResponseType>('auth/me', {name, avatar})
    },
}

// Types
export type ChangeInfoResponseType = {
    updatedUser: {user: UserResponseType}
    error?: string
}
