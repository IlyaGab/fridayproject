import {instance} from './istanceSettings'

export const userAPI = {
    getUserInfo(id: string) {
        return instance.get<GetUserInfoResponseType>(`social/user?id=${id}`)
    },
    getUsersList(queryParams: QueryParamsUsersListType) {
        const params = queryParams

        return instance.get<GetUsersListResponseType>('social/users', {params})
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

export type QueryParamsUsersListType = {
    userName: string
    min: number
    max: number
    sortUsers: string
    page: number
    pageCount: number
}

export type GetUsersListResponseType = {
    users: UsersListType[]
    page: number
    pageCount: number
    usersTotalCount: number
    minPublicCardPacksCount: number
    maxPublicCardPacksCount: number
    token: string
    tokenDeathTime: number
}

export type UsersListType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    updated: string
    verified: boolean
    _id: string
}
