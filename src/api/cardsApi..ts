import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})


export const cardsAPI = {
    me() {
        return instance.post<MeResponseType>("auth/me", {})
    },

    changeNInfo(name: string, avatar: string) {
        return instance.put("auth/me", {name, avatar})
    }
}

// TYPES

type MeResponseType = {
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
