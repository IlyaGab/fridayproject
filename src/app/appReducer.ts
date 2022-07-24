const initialState = {
    error: null as null | string,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppError = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)


// Types
type InitialStateType = typeof initialState

export type AppActionsType = SetAppErrorActionType

export type SetAppErrorActionType = ReturnType<typeof setAppError>