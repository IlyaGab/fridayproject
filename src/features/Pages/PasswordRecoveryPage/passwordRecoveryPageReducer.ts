import {authAPI, ForgotParamsType} from '../../../api/cards-api'
import {setAppErrorAC, setAppStatusAC} from '../../../app/appReducer'
import {AppDispatchType, AppThunkType} from '../../../app/store';

let initialState = {
    isSend: false
}

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: PasswordRecoveryActionsType) => {
    switch (action.type) {
        case 'forgotPassword/SET-IS-SEND-IN':
            return {...state, isSend: action.value}
        default:
            return state
    }
}


export const setIsSendAC = (value: boolean) => ({type: 'forgotPassword/SET-IS-SEND-IN', value} as const)

export const forgotTC = (data: ForgotParamsType): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.forgot(data)
        .then(() => {
            dispatch(setIsSendAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            dispatch(setAppErrorAC(error.response.data.error))
            dispatch(setAppStatusAC('failed'))
        })
        .finally(() => {
            dispatch(setIsSendAC(false))
        })
}


type InitialStateType = typeof initialState

export type PasswordRecoveryActionsType = ReturnType<typeof setIsSendAC>