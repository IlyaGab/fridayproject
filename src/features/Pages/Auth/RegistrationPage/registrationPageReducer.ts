import {authAPI, RegisterParamsType} from '../../../../api/authAPI'
import {setAppStatusAC} from '../../../../app/appReducer'
import {AppThunkType} from '../../../../app/store'
import {handleServerNetworkError} from '../../../../common/utils/error-utils'

const initialState = {
    isRegistered: false,
}

export const registrationReducer = (
    state: InitialStateType = initialState,
    action: RegisterActionsType,
): InitialStateType => {
    switch (action.type) {
        case 'REGISTRATION/SET-IS-REGISTERED':
            return {...state, isRegistered: action.payload.value}
        default:
            return state
    }
}

// AC
export const setIsRegisteredAC = (value: boolean) =>
    ({
        type: 'REGISTRATION/SET-IS-REGISTERED',
        payload: {
            value,
        },
    } as const)

// TC
export const registrationTC =
    (data: RegisterParamsType): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            await authAPI.register(data)
            dispatch(setIsRegisteredAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    }

// Types
type InitialStateType = typeof initialState
export type RegisterActionsType = ReturnType<typeof setIsRegisteredAC>
