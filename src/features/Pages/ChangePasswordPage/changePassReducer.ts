import {AppDispatchType, AppThunkType} from "../../../app/store";
import {authAPI} from "../../../api/cards-api";
import {setAppErrorAC, setAppStatusAC} from "../../../app/appReducer";
import {setIsSendAC} from "../PasswordRecoveryPage/passwordRecoveryPageReducer";

let initialState = {
    isSetNewPassword: false
}

export const changePasswordReducer = (state: InitialStateType = initialState, action: ChangePasswordActionType) => {
    switch (action.type) {
        case "IS_SET_NEW_PASSWORD": {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}


// AC
export const isSetNewPasswordAC = (isSetNewPassword: boolean) => ({
    type: "IS_SET_NEW_PASSWORD",
    payload: {
        isSetNewPassword
    }
})


// TC
export const setNewPasswordTC = (password: string, resetPasswordToken: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    console.log(password, resetPasswordToken)
    authAPI.setNewPassword({password, resetPasswordToken})
        .then(() => {
            dispatch(isSetNewPasswordAC(true))
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


// TYPES
export type ChangePasswordActionType = ReturnType<typeof isSetNewPasswordAC>

type InitialStateType = {
    isSetNewPassword: boolean
}