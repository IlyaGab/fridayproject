import { Dispatch } from 'redux';
import {authAPI, LoginParamsType} from '../../../api/cards-api';
import {setAppErrorAC} from '../../../app/appReducer';
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../../app/appReducer';

type InitialStateType = typeof initialState

export type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType

let initialState = {
    isLoggedIn:false
}

export const loginReducer = (state:InitialStateType = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value:boolean) => ({type:'login/SET-IS-LOGGED-IN', value} as const)

export const loginTC = (data:LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if(res){
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
        .catch((error)=>{
            dispatch(setAppErrorAC(error.response.data.error)) 
            dispatch(setAppStatusAC('idle'))
        })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if(res){
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
        .catch((error) => {
            dispatch(setAppErrorAC(error.response.data.error))
        })
}
