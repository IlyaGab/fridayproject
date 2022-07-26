import { Dispatch } from "redux"
import { authAPI, ForgotParamsType } from "../../../api/cards-api"
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../../../app/appReducer"

let initialState = {
    isSend:false
}

export const passwordRecoveryReducer = (state:InitialStateType = initialState, action:ActionsType) => {
    switch (action.type) {
        case 'forgotPassword/SET-IS-SEND-IN':
            return {...state, isSend:action.value}
        default:
            return state
    }
}


export const setIsSendAC = (value:boolean) => ({type:'forgotPassword/SET-IS-SEND-IN', value} as const)

export const forgotTC = (data:ForgotParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.forgot(data)
        .then(res => {
                dispatch(setIsSendAC(true))
                dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error)=>{
            dispatch(setAppErrorAC(error.response.data.error)) 
            dispatch(setAppStatusAC('failed'))
        })
}



type InitialStateType = typeof initialState

export type ActionsType = ReturnType<typeof setIsSendAC> | SetAppStatusActionType | SetAppErrorActionType