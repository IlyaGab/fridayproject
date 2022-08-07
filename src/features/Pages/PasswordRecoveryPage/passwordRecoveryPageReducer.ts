import {setAppStatusAC} from "../../../app/appReducer"
import {AppThunkType} from "../../../app/store"
import {authAPI, ForgotParamsType} from "../../../api/authAPI";
import {handleServerNetworkError} from "../../../common/utils/error-utils";

const initialState = {
    isSendMessageToEmail: false
}

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: PasswordRecoveryActionsType): InitialStateType => {
    switch (action.type) {
        case "FORGOT-PASSWORD/SET-IS-SEND-IN":
            return {...state, isSendMessageToEmail: action.value}
        default:
            return state
    }
}

//AC
export const setIsSendMessageToEmailAC = (value: boolean) => ({
    type: "FORGOT-PASSWORD/SET-IS-SEND-IN",
    value
} as const)

//TC
export const forgotTC = (data: ForgotParamsType): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await authAPI.forgot(data)
        dispatch(setIsSendMessageToEmailAC(true))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(setIsSendMessageToEmailAC(false))
    }
}

//Types
type InitialStateType = typeof initialState
export type PasswordRecoveryActionsType = ReturnType<typeof setIsSendMessageToEmailAC>