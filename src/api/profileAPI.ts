import {instance} from './istanceSettings';
import {UserResponseType} from './authAPI';

export const profileAPI = {
    changeInfo(name: string) {
        return instance.put<ChangeInfoResponseType>('auth/me', {name, avatar: 'avatar'})
    }
}

// Types
export type ChangeInfoResponseType = {
    updatedUser: { user: UserResponseType }
    error?: string
}