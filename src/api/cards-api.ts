import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0' || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<RegisterResponseType>>('auth/login', data)
    },
    me() {
        return instance.post<ResponseType>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType>('auth/me')
    }
}

export type LoginParamsType = {
    email: string
    password:string
    rememberMe:boolean
}

export type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

export type RegisterResponseType<D={}> = {
    addedUser: D,
    error?:string
}