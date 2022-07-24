import {setIsLoggedInAC} from '../features/Pages/LoginPage/loginPageReducer';
import {authAPI} from '../api/cards-api';
import {Dispatch} from 'redux';

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppInitActionType

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized:false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized:boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setInitAC = (value : boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitActionType = ReturnType<typeof setInitAC>

export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then(res => {
                if(res){
                    dispatch(setIsLoggedInAC(true));
                    dispatch(setAppStatusAC('succeeded'))
                }
            })
            .catch((error) => {
                alert(error.message)
            })
            .finally(()=>{
                dispatch(setInitAC(true))
            })
    };
}