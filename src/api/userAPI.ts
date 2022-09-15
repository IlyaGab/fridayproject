import {instance} from './istanceSettings'

export const userAPI = {
    getUserInfo(id: string) {
        return instance.get<GetUserInfoResponseType>(`social/user?id=${id}`)
    },
}

// Types
export type GetUserInfoResponseType = {
    token: string
    tokenDeathTime: string
    user: UserInfoType
}

export type UserInfoType = {
    _id: string
    email: string
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    avatar: string
}
