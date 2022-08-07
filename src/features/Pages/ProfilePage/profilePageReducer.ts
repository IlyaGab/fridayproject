import {AppThunkType} from "../../../app/store";
import {profileAPI} from "../../../api/profileAPI";
import {setAppStatusAC} from "../../../app/appReducer";
import {handleServerNetworkError} from "../../../common/utils/error-utils";

const initialState = {
    name: "",
    email: "",
    avatar: "avatar",
    _id: ""
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET_PROFILE_DATA":
            return {
                ...state, ...action.payload
            }
        case "PROFILE/CHANGE_INFO":
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}

//AC
export const setProfileDataAC = (name: string, email: string, avatar: string, _id: string) => ({
    type: "PROFILE/SET_PROFILE_DATA",
    payload: {
        name,
        email,
        avatar,
        _id
    }
}) as const

export const changeInfoProfileAC = (name: string, avatar: string) => ({
    type: "PROFILE/CHANGE_INFO",
    payload: {
        name,
        avatar
    }
}) as const

//TC
export const changeInfoProfileTC = (name: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await profileAPI.changeInfo(name)
        dispatch(changeInfoProfileAC(name, "avatar"))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    }
}

//Types
export type ProfileActionType = ReturnType<typeof changeInfoProfileAC> |
    ReturnType<typeof setProfileDataAC>
type InitialStateType = typeof initialState
