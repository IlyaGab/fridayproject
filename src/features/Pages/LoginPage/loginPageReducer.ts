import {setAppErrorAC, setAppStatusAC} from '../../../app/appReducer';
import {setProfileDataAC} from "../ProfilePage/profilePageReducer";
import {AppThunkType} from "../../../app/store";
import {authAPI, LoginParamsType} from "../../../api/authAPI";

const initialState = {
    isLoggedIn: false
}

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//AC
export const setIsLoggedInAC = (value: boolean) => ({
    type: 'LOGIN/SET-IS-LOGGED-IN',
    value
} as const)

//TC
export const loginTC = (data: LoginParamsType): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
            if(res.data.avatar) {
                dispatch(setProfileDataAC(res.data.name, res.data.email, res.data.avatar, res.data._id))
            } else {
                dispatch(setProfileDataAC(res.data.name, res.data.email, "avatar", res.data._id))
            }
        })
        .catch((error) => {
            dispatch(setAppErrorAC(error.response.data.error))
            dispatch(setAppStatusAC('idle'))
        })
}

export const logoutTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
        .catch((error) => {
            dispatch(setAppErrorAC(error.response.data.error))
        })
}

// Types
type InitialStateType = typeof initialState
export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>
