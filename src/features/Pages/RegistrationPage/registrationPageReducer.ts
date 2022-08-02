import {AppThunkType} from '../../../app/store';
import {setAppErrorAC, setAppStatusAC} from '../../../app/appReducer';
import {authAPI, RegisterParamsType} from '../../../api/authAPI';

const initialState = {
    isRegistered: false
}

export const registrationReducer = (state: InitialStateType = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTRATION/SET-IS-REGISTERED':
            return {...state, isRegistered: action.value}
        default:
            return state
    }
}

//AC
export const setIsRegisteredAC = (value: boolean) => ({
    type: 'REGISTRATION/SET-IS-REGISTERED',
    value
} as const)


//TC
export const registrationTC = (data: RegisterParamsType): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.register(data)
        .then(() => {
            dispatch(setIsRegisteredAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.response.data.error))
            dispatch(setAppStatusAC('failed'))
        })
        .finally(() => {
            dispatch(setIsRegisteredAC(false))
        })
}

//Types
type InitialStateType = typeof initialState
export type RegisterActionsType = ReturnType<typeof setIsRegisteredAC>