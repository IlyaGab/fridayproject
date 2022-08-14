import {instance} from './istanceSettings';
import {UserResponseType} from './authAPI';

export const profileAPI = {
    changeInfo(name: string, avatar: string) {
        return instance.put<ChangeInfoResponseType>('auth/me', {name, avatar})
    }
}

// Types
export type ChangeInfoResponseType = {
    updatedUser: { user: UserResponseType }
    error?: string
}