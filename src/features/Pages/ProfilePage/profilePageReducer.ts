import {AppThunkType} from "../../../app/store";
import {profileAPI} from "../../../api/profileAPI";
import {setAppErrorAC} from "../../../app/appReducer";

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
export const setProfileDataAC = (name: string, email: string, avatar: string, _id:string) => ({
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
export const changeInfoProfileTC = (name: string): AppThunkType => (dispatch) => {
    profileAPI.changeInfo(name)
        .then(() => {
            dispatch(changeInfoProfileAC(name, "avatar"))
        })
        .catch((error) => {
            dispatch(setAppErrorAC(error.response.data.error))
        })
}

//Types
export type ProfileActionType = ReturnType<typeof changeInfoProfileAC> |
    ReturnType<typeof setProfileDataAC>
type InitialStateType = typeof initialState
