import {setAppErrorAC, setAppStatusAC} from '../../../app/appReducer'
import {AppThunkType} from '../../../app/store'
import {authAPI, ForgotParamsType} from "../../../api/authAPI";

const initialState = {
    isSendMessageToEmail: false
}

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: PasswordRecoveryActionsType): InitialStateType => {
    switch (action.type) {
        case 'FORGOT-PASSWORD/SET-IS-SEND-IN':
            return {...state, isSendMessageToEmail: action.value}
        default:
            return state
    }
}

//AC
export const setIsSendMessageToEmailAC = (value: boolean) => ({type: 'FORGOT-PASSWORD/SET-IS-SEND-IN', value} as const)

//TC
export const forgotTC = (data: ForgotParamsType): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.forgot(data)
        .then(() => {
            dispatch(setIsSendMessageToEmailAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            dispatch(setAppErrorAC(error.response.data.error))
            dispatch(setAppStatusAC('failed'))
        })
        .finally(() => {
            dispatch(setIsSendMessageToEmailAC(false))
        })
}

//Types
type InitialStateType = typeof initialState
export type PasswordRecoveryActionsType = ReturnType<typeof setIsSendMessageToEmailAC>