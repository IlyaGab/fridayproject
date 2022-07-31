import {instance} from "./istanceAPI";

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<UserResponseType>('auth/login', data)
    },
    me() {
        return instance.post<UserResponseType>('auth/me')
    },
    logout() {
        return instance.delete<InfoResponseType>('auth/me')
    },
    register: (data: RegisterParamsType) => {
        return instance.post<RegisterResponseType>('auth/register', data)
    },
    forgot(data: ForgotParamsType) {
        return instance.post<InfoResponseType>('auth/forgot', data)
    },
    setNewPassword(data: SetNewPasswordParamsType) {
        return instance.post<InfoResponseType>("auth/set-new-password", data)
    }
}

// Types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type RegisterParamsType = {
    email: string
    password: string
}

export type SetNewPasswordParamsType = {
    password: string
    resetPasswordToken: string
}

export type UserResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}

export type ForgotParamsType = {
    email: string
    from: string
    message: string
}

export type RegisterResponseType<D = {}> = {
    addedUser: D,
    error?: string
}

export type InfoResponseType = {
    info: string
    error: string
}