import {authAPI} from '../api/authAPI'
import {setIsLoggedInAC} from '../features/Pages/Auth/LoginPage/loginPageReducer'
import {setProfileDataAC} from '../features/Pages/Auth/ProfilePage/profilePageReducer'

import {AppThunkType} from './store'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null,
    isInitialized: false,
}

export const appReducer = (
    state: InitialStateType = initialState,
    action: AppActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return {...state}
    }
}

// AC
export const setAppErrorAC = (error: string | null) =>
    ({
        type: 'APP/SET-ERROR',
        payload: {
            error,
        },
    } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
    ({
        type: 'APP/SET-STATUS',
        payload: {
            status,
        },
    } as const)
export const setInitAC = (isInitialized: boolean) =>
    ({
        type: 'APP/SET-IS-INITIALIZED',
        payload: {
            isInitialized,
        },
    } as const)

// TC
export const initializeAppTC = (): AppThunkType => async dispatch => {
    try {
        const res = await authAPI.me()

        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
        if (res.data.avatar) {
            dispatch(
                setProfileDataAC(
                    res.data.name,
                    res.data.email,
                    res.data.avatar,
                    // eslint-disable-next-line no-underscore-dangle
                    res.data._id,
                ),
            )
        } else {
            dispatch(
                // eslint-disable-next-line no-underscore-dangle
                setProfileDataAC(res.data.name, res.data.email, 'avatar', res.data._id),
            )
        }
    } finally {
        dispatch(setInitAC(true))
    }
}

// Types
export type AppActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setInitAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
}
