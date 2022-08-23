import {authAPI, LoginParamsType} from '../../../../api/authAPI'
import {setAppStatusAC} from '../../../../app/appReducer'
import {AppThunkType} from '../../../../app/store'
import {handleServerNetworkError} from '../../../../common/utils/error-utils'
import {setProfileDataAC} from '../ProfilePage/profilePageReducer'

const initialState = {
    isLoggedIn: false,
}

export const loginReducer = (
    state: InitialStateType = initialState,
    action: LoginActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.payload.value}
        default:
            return state
    }
}

// AC
export const setIsLoggedInAC = (value: boolean) =>
    ({
        type: 'LOGIN/SET-IS-LOGGED-IN',
        payload: {
            value,
        },
    } as const)

// TC
export const loginTC =
    (data: LoginParamsType): AppThunkType =>
    async dispatch => {
        try {
            dispatch(setAppStatusAC('loading'))
            const res = await authAPI.login(data)

            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
            if (res.data.avatar) {
                dispatch(
                    setProfileDataAC(
                        res.data.name,
                        res.data.email,
                        res.data.avatar,
                        res.data._id,
                    ),
                )
            } else {
                dispatch(
                    setProfileDataAC(
                        res.data.name,
                        res.data.email,
                        'avatar',
                        res.data._id,
                    ),
                )
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    }

export const logoutTC = (): AppThunkType => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        await authAPI.logout()
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC('failed'))
    }
}

// Types
type InitialStateType = typeof initialState
export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>
