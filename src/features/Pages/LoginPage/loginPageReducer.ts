import { Dispatch } from 'redux';
import {authAPI, LoginParamsType} from '../../../api/cards-api';
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../../app/appReducer';

type InitialStateType = typeof initialState

export type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType

const SetIsLoggedIn = 'login/SET-IS-LOGGED-IN'

let initialState = {
    isLoggedIn:false
}

export const loginReducer = (state:InitialStateType = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case SetIsLoggedIn:
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value:boolean) => ({type:SetIsLoggedIn, value} as const)

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
            alert(error.response.data.error)
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
            alert(error.response.data.error)
        })
}
