import {GetUsersListResponseType, userAPI, UsersListType} from '../../../../api/userAPI'
import {setAppStatusAC} from '../../../../app/appReducer'
import {AppThunkType} from '../../../../app/store'
import {handleServerNetworkError} from '../../../../common/utils/error-utils'

const initialState = {
    users: [] as UsersListType[],
    page: 1,
    pageCount: 5,
    usersTotalCount: 5,
    minPublicCardPacksCount: 0,
    maxPublicCardPacksCount: 5,
    token: '',
    tokenDeathTime: 0,
    queryParams: {
        userName: '',
        min: 3,
        max: 9,
        sortUsers: '0publicCardPacksCount',
        page: 1,
        pageCount: 5,
    },
}

export const usersListReducer = (
    state: InitialStateType = initialState,
    action: UsersListActionType,
): InitialStateType => {
    switch (action.type) {
        case 'USERS-LIST/GET-USERS-LIST':
            return {
                ...state,
                ...action.payload.data,
            }
        case 'USERS-LIST/SET-QUERY-PARAMS':
            return {
                ...state,
                queryParams: {
                    ...state.queryParams,
                    ...action.payload,
                },
            }

        default:
            return state
    }
}

// AC
export const getUsersListAC = (data: GetUsersListResponseType) =>
    ({
        type: 'USERS-LIST/GET-USERS-LIST',
        payload: {
            data,
        },
    } as const)

export const setUsersListQueryParamsAC = (queryParams: UsersListQueryParamsActionType) =>
    ({
        type: 'USERS-LIST/SET-QUERY-PARAMS',
        payload: {
            ...queryParams,
        },
    } as const)

// TC
export const getUsersListTC = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await userAPI.getUsersList(getState().usersList.queryParams)

        dispatch(getUsersListAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC('failed'))
    }
}

// Types
export type UsersListActionType =
    | ReturnType<typeof getUsersListAC>
    | ReturnType<typeof setUsersListQueryParamsAC>
type InitialStateType = typeof initialState

type UsersListQueryParamsActionType = {
    userName?: string
    min?: number
    max?: number
    sortUsers?: string
    page?: number
    pageCount?: number
}
