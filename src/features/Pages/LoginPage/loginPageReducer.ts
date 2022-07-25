import {authAPI, LoginParamsType} from '../../../api/cards-api';
import {setAppErrorAC, setAppStatusAC} from '../../../app/appReducer';
import {setUserDataAC} from "../ProfilePage/profilePageReducer";
import {AppDispatchType, AppThunkType} from "../../../app/store";

const SetIsLoggedIn = 'login/SET-IS-LOGGED-IN'

let initialState = {
    isLoggedIn:false
}

export const loginReducer = (state:InitialStateType = initialState, action:LoginActionsType):InitialStateType => {
    switch (action.type) {
        case SetIsLoggedIn:
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// AC
export const setIsLoggedInAC = (value:boolean) => ({type:SetIsLoggedIn, value} as const)


// TC
export const loginTC = (data:LoginParamsType): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            // А надо проверять?
            if(res){
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setUserDataAC(res.data.name, res.data.email))
            }
        })
        .catch((error)=>{
            dispatch(setAppErrorAC(error.response.data.error)) 
            dispatch(setAppStatusAC('idle'))
        })
}

export const logoutTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if(res){
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
