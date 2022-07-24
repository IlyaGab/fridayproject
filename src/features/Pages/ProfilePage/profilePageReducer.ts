const initialState = {
    name: "Ivan" ,
    email: "j&johnson@gmail.com" ,
    avatar: null
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
const setUserDataAC = (name: string, email: string, avatar?: string) => ({
    type: "SET_PROFILE_DATA",
    payload: {
        name,
        email,
        avatar
    }
}) as const


const changeInfoAC = (name: string, avatar: string) => ({
    type: "CHANGE_INFO",
    payload: {
        name,
        avatar
    }
})as const


// TC
// export const changeInfoTC = (name: string, avatar: string): AppThunkType => (dispatch: AppDispatchType) => {
//     profileAPI.changeNInfo(name, avatar).then(() => {
//         dispatch(changeInfoAC(name, avatar))
//     })
// }

// export const setProfileDataTC = (): AppThunkType => (dispatch: AppDispatchType) => {
//     authAPI.me().then((res) => {
//         dispatch(setUserDataAC(res.data.name, res.data.email, res.data.avatar))
//     })
// }


// TYPES
export type ProfileActionType = ReturnType<typeof changeInfoAC> |
    ReturnType<typeof setUserDataAC>

type InitialStateType = {
    name: null | string,
    email:  null | string,
    avatar?: null | string
}