import {authAPI, ForgotParamsType} from '../../../api/cards-api'
import {setAppErrorAC, setAppStatusAC} from '../../../app/appReducer'
import {AppDispatchType, AppThunkType} from '../../../app/store';

const initialState = {
    isSend: false
}

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: PasswordRecoveryActionsType) => {
    switch (action.type) {
        case 'FORGOT-PASSWORD/SET-IS-SEND-IN':
            return {...state, isSend: action.value}
        default:
            return state
    }
}

//AC
export const setIsSendAC = (value: boolean) => ({type: 'FORGOT-PASSWORD/SET-IS-SEND-IN', value} as const)

//TC
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

//Types
type InitialStateType = typeof initialState
export type PasswordRecoveryActionsType = ReturnType<typeof setIsSendAC>