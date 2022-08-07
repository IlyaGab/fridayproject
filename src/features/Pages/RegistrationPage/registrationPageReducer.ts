import {AppThunkType} from "../../../app/store";
import {setAppStatusAC} from "../../../app/appReducer";
import {authAPI, RegisterParamsType} from "../../../api/authAPI";
import {handleServerNetworkError} from "../../../common/utils/error-utils";

const initialState = {
    isRegistered: false
}

export const registrationReducer = (state: InitialStateType = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {
        case "REGISTRATION/SET-IS-REGISTERED":
            return {...state, isRegistered: action.value}
        default:
            return state
    }
}

//AC
export const setIsRegisteredAC = (value: boolean) => ({
    type: "REGISTRATION/SET-IS-REGISTERED",
    value
} as const)


//TC
export const registrationTC = (data: RegisterParamsType): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await authAPI.register(data)
        dispatch(setIsRegisteredAC(true))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    } finally {
        dispatch(setIsRegisteredAC(false))
    }

}

//Types
type InitialStateType = typeof initialState
export type RegisterActionsType = ReturnType<typeof setIsRegisteredAC>