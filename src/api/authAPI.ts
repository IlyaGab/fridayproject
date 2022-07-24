import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})

export const authAPI = {
    register: (data: RegisterParamsType) => {
        return instance.post<RegisterParamsType, AxiosResponse<{ error?: string }>>('auth/register', data)
    }
}


// Types
export type RegisterParamsType = {
    email: string
    password: string
}