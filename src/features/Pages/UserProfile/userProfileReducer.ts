import {userAPI, UserInfoType} from '../../../api/userAPI'
import {setAppStatusAC} from '../../../app/appReducer'
import {AppThunkType} from '../../../app/store'
import {handleServerNetworkError} from '../../../common/utils/error-utils'

const initialState = {
    _id: '',
    email: '',
    isAdmin: false,
    name: '',
    verified: false,
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    avatar: '',
    queryParams: {
        id: '',
    },
}

export const userProfileReducer = (
    state: InitialStateType = initialState,
    action: UserProfileActionType,
): InitialStateType => {
    switch (action.type) {
        case 'USER-PROFILE/GET-USER-INFO':
            return {
                ...state,
                ...action.payload.data,
            }
        case 'USER-PROFILE/SET-QUERY-PARAMS':
            return {
                ...state,
                queryParams: {
                    ...action.payload,
                },
            }

        default:
            return state
    }
}

// AC
export const getUserInfoAC = (data: UserInfoType) =>
    ({
        type: 'USER-PROFILE/GET-USER-INFO',
        payload: {
            data,
        },
    } as const)

export const setUserProfileQueryParamsAC = (id: string) =>
    ({
        type: 'USER-PROFILE/SET-QUERY-PARAMS',
        payload: {
            id,
        },
    } as const)

// TC
export const getUserInfoTC = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await userAPI.getUserInfo(getState().userProfile.queryParams.id)

        dispatch(getUserInfoAC(res.data.user))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC('failed'))
    }
}

// Types
export type UserProfileActionType =
    | ReturnType<typeof getUserInfoAC>
    | ReturnType<typeof setUserProfileQueryParamsAC>
type InitialStateType = typeof initialState
