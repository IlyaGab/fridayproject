import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0" || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<LoginResponseType>('auth/login', data)
    },
    me() {
        return instance.post<MeResponseType>('auth/me')
    },
    logout() {
        return instance.delete<MeResponseType>('auth/me')
    },
    register: (data: RegisterParamsType) => {
        return instance.post<RegisterParamsType, AxiosResponse<{ error?: string }>>('auth/register', data)
    }
}

export const profileAPI = {
    changeNInfo(name: string, avatar: string) {
        return instance.put("auth/me", {name, avatar})
    }
}

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

export type LoginResponseType<D={}> = {
    addedUser: D,
    error?:string
}

export type RegisterParamsType = {
    email: string
    password: string
}