import {AppThunkType} from '../../../app/store';
import {setAppErrorAC} from '../../../app/appReducer';
import {setAppStatusAC} from '../../../app/appReducer';
import {authAPI, RegisterParamsType} from '../../../api/cards-api';

const initialState = {
    isRegistered: false
}

export const registrationReducer = (state: InitialStateType = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-REGISTERED':
            return {...state, isRegistered: action.value}
        default:
            return state
    }
}


// Action Creators
const setIsRegisteredAC = (value: boolean) => ({type: 'SET-IS-REGISTERED', value} as const)


// Thunk Creators
export const registerTC = (data: RegisterParamsType): AppThunkType => (dispatch) => {
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


// Types
type InitialStateType = typeof initialState

export type RegisterActionsType = SetIsRegisteredActionType
export type SetIsRegisteredActionType = ReturnType<typeof setIsRegisteredAC>