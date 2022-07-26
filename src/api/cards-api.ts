import axios from 'axios';

export const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/" || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<MeResponseType>('auth/login', data)
    },
    me() {
        return instance.post<MeResponseType>('auth/me')
    },
    logout() {
        return instance.delete<DeleteResponseType>('auth/me')
    },
    register: (data: RegisterParamsType) => {
        return instance.post<RegisterResponseType>('auth/register', data)
    },
    forgot (data:ForgotParamsType) {
        return instance.post<ForgotParamsType>('auth/forgot', data)
    }
}

export const profileAPI = {
    changeNInfo(name: string) {
        return instance.put("auth/me", {name, avatar: "avatar"})
    }
}

// Types
export type LoginParamsType = {
    email: string
    password:string
    rememberMe:boolean
}

export type MeResponseType = {
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
    email:string
    from:string
    message:string
}

export type RegisterResponseType<D={}> = {
    addedUser: D,
    error?:string
}

export type RegisterParamsType = {
    email: string
    password: string
}

export type DeleteResponseType = {
    info: string
    error: string
}