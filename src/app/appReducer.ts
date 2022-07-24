import {setIsLoggedInAC} from '../features/Pages/LoginPage/loginPageReducer';
import {authAPI} from '../api/cards-api';
import {Dispatch} from 'redux';


const initialState = {
    status: 'idle' as string,
    error: null as null | string,
    isInitialized:false as boolean
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



export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setInitAC = (value : boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

//Th
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


//Types
export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppInitActionType

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitActionType = ReturnType<typeof setInitAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
