import {AppDispatchType, AppThunkType} from "../../../app/store";
import {profileAPI} from "../../../api/cards-api";

const initialState = {
    name: "" ,
    email: "",
    avatar: "avatar"
}

export const profileReducer = (state:InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
    switch (action.type) {
        case "SET_PROFILE_DATA": {
            return {
                ...state, ...action.payload
            }
        }
        case "CHANGE_INFO": {
            return {
                ...state, ...action.payload
            }
        }
        default:
            return state
    }
}


// AC
export const setUserDataAC = (name: string, email: string, avatar?: string) => ({
    type: "SET_PROFILE_DATA",
    payload: {
        name,
        email,
        avatar
    }
}) as const


export const changeInfoProfileAC = (name: string, avatar: string) => ({
    type: "CHANGE_INFO",
    payload: {
        name,
        avatar
    }
})as const


// TC
export const changeInfoProfileTC = (name: string): AppThunkType => (dispatch: AppDispatchType) => {
    profileAPI.changeNInfo(name).then(() => {
        dispatch(changeInfoProfileAC(name, "avatar"))
    })
}


// TYPES
export type ProfileActionType = ReturnType<typeof changeInfoProfileAC> |
    ReturnType<typeof setUserDataAC>

type InitialStateType = {
    name: string,
    email:  string,
    avatar?: string
}