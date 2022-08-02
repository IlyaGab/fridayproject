import {setIsLoggedInAC} from '../features/Pages/LoginPage/loginPageReducer';
import {Dispatch} from 'redux';
import {authAPI} from "../api/authAPI";
import {setProfileDataAC} from "../features/Pages/ProfilePage/profilePageReducer";

const initialState = {
    status: 'idle' as string,
    error: null as null | string,
    isInitialized: false as boolean
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

//AC
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
} as const)
export const setInitAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

//TC
export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then(res => {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'))
                if(res.data.avatar) {
                    dispatch(setProfileDataAC(res.data.name, res.data.email, res.data.avatar, res.data._id))
                } else {
                    dispatch(setProfileDataAC(res.data.name, res.data.email, "avatar",res.data._id))
                }

            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setInitAC(true))
            })
    };
}

//Types
export type AppActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setInitAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState