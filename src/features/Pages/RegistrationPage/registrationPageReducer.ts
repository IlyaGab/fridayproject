import {authAPI, RegisterParamsType} from '../../../api/authAPI';
import {AppThunkType} from '../../../app/store';
import {AxiosError} from 'axios';
import {setAppError} from '../../../app/appReducer';

const initialState = {
    isRegister: false
}

export const registrationReducer = (state: InitialStateType = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-REGISTER-SUCCEEDED':
            return {...state, isRegister: action.value}
        default:
            return state
    }
}


// Action Creators
const setIsRegisterSucceeded = (value: boolean) => ({type: 'SET-IS-REGISTER-SUCCEEDED', value} as const)


// Thunk Creators
export const registerTC = (data: RegisterParamsType): AppThunkType => (dispatch) => {
    authAPI.register(data)
        .then(() => {
            dispatch(setIsRegisterSucceeded(true))
        })
        .catch((error: AxiosError) => {
            dispatch(setAppError(error.message))
        })
}


// Types
type InitialStateType = typeof initialState

export type RegisterActionsType = SetIsRegisterSucceededActionType
export type SetIsRegisterSucceededActionType = ReturnType<typeof setIsRegisterSucceeded>