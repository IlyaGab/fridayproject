import {AppThunkType} from "../../../app/store";
import {setAppStatusAC} from "../../../app/appReducer";
import {authAPI} from "../../../api/authAPI";
import {setIsSendMessageToEmailAC} from "../PasswordRecoveryPage/passwordRecoveryPageReducer";
import {handleServerNetworkError} from "../../../common/utils/error-utils";

const initialState = {
    isSetNewPassword: false
}

export const changePasswordReducer = (state: InitialStateType = initialState, action: ChangePasswordActionType): InitialStateType => {
    switch (action.type) {
        case "CHANGE-PASSWORD/IS-SET-NEW-PASSWORD":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

//AC
export const isSetNewPasswordAC = (isSetNewPassword: boolean) => ({
    type: "CHANGE-PASSWORD/IS-SET-NEW-PASSWORD",
    payload: {
        isSetNewPassword
    }
})

//TC
export const setNewPasswordTC = (password: string, resetPasswordToken: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        await authAPI.setNewPassword({password, resetPasswordToken})
        dispatch(isSetNewPasswordAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(setIsSendMessageToEmailAC(false))
    }
}

//Types
export type ChangePasswordActionType = ReturnType<typeof isSetNewPasswordAC>
type InitialStateType = typeof initialState