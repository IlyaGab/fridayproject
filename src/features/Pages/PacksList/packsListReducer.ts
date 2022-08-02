import { AppStateType, AppThunkType } from '../../../app/store'
import { CardsPackType, GetPacksResponseType, packsAPI, PackType } from '../../../api/packsAPI'

const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
    token: '',
    tokenDeathTime: 0,
    queryParams: {
        packName: '',
        min: 0,
        max: 110,
        sortPacks: 0,
        sortPacksName: 'updated',
        page: 1,
        pageCount: 5,
        isMyCardsPack: false
    }
}

export const packsListReducer = (state: InitialStateType = initialState, action: PacksListActionType): InitialStateType => {
    switch (action.type) {
        case 'PACKS-LIST/GET-PACKS-LIST':
            return {
                ...state, ...action.payload.data
            }
        case 'PACKS-LIST/SET-MIN-MAX-VALUE':
            return {
                ...state,
                queryParams: {
                    ...state.queryParams,
                    ...action.payload
                }
            }
        case 'PACKS-LIST/SET-IS-MY-CARDS-PACK':
            return {
                ...state,
                queryParams: {
                    ...state.queryParams,
                    isMyCardsPack: action.payload.value
                }
            }
        case 'PACKS-LIST/SET-PAGE-NUMBER-COUNT':
            return {
                ...state, queryParams: {
                    ...state.queryParams,
                    ...action.payload
                }
            }
        case 'PACKS-LIST/SET-SORT-PACKS':
            return {
                ...state, queryParams: {
                    ...state.queryParams, ...action.payload
                }
            }
        case 'PACKS-LIST/SET-QUERY-PARAMS':
            return {
                ...state, queryParams: {
                    ...state.queryParams,
                    ...action.payload
                }
            }
        case 'PACKS-LIST/CHANGE-SEARCH-VALUE':
            return {
                ...state, queryParams: {
                    ...state.queryParams, packName: action.payload.packName
                }
            }
        default:
            return state
    }
}

//AC
export const getPacksListAC = (data: GetPacksResponseType) => ({
    type: 'PACKS-LIST/GET-PACKS-LIST',
    payload: {
        data
    }
}) as const

export const setMinMaxValueAC = (min: number, max: number) => ({
    type: 'PACKS-LIST/SET-MIN-MAX-VALUE',
    payload: {
        min, max
    }
}) as const

export const setIsMyCardsPackAC = (value: boolean) => ({
    type: 'PACKS-LIST/SET-IS-MY-CARDS-PACK',
    payload: {
        value
    }
}) as const

export const setSortPacksAC = (sortPacks: number, sortPacksName: string) => ({
    type: 'PACKS-LIST/SET-SORT-PACKS',
    payload: {
        sortPacks, sortPacksName
    }
}) as const

export const setPageNumberCountAC = (page: number, pageCount: number) => ({
    type: 'PACKS-LIST/SET-PAGE-NUMBER-COUNT',
    payload: {
        page, pageCount
    }
}) as const

export const setQueryParamsAC = (queryParams: QueryParamsThunkType) => ({
    type: 'PACKS-LIST/SET-QUERY-PARAMS',
    payload: {
        ...queryParams
    }
}) as const

export const changeSearchValueAC = (packName: string) => ({
    type: 'PACKS-LIST/CHANGE-SEARCH-VALUE',
    payload: {
        packName
    }
}) as const

//TC
export const getPackListTC = (): AppThunkType => (dispatch, getState: () => AppStateType) => {
    packsAPI.getCardsPacks(getState().packsList.queryParams, getState().profileReducer._id)
        .then((res) => {
            dispatch(getPacksListAC(res.data))
        })
}

export const createCardsPackTC = (newCardsPack: CardsPackType): AppThunkType => (dispatch) => {
    packsAPI.createCardsPack(newCardsPack)
        .then(() => {
            dispatch(getPackListTC())
        })
}

export const deleteCardsPackTC = (id: string): AppThunkType => (dispatch) => {
    packsAPI.deleteCardsPack(id)
        .then(() => {
            dispatch(getPackListTC())
        })
}

export const changeNameCardsPackTC = (id: string, name: string): AppThunkType => (dispatch) => {
    packsAPI.changeNameCardsPack(id, name)
        .then(() => {
            dispatch(getPackListTC())
        })
}


//Types
export type PacksListActionType = ReturnType<typeof getPacksListAC>
    | ReturnType<typeof setMinMaxValueAC>
    | ReturnType<typeof setIsMyCardsPackAC>
    | ReturnType<typeof setPageNumberCountAC>
    | ReturnType<typeof setSortPacksAC>
    | ReturnType<typeof setQueryParamsAC>
    | ReturnType<typeof changeSearchValueAC>
type InitialStateType = typeof initialState
type QueryParamsThunkType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: number
    sortPacksName?: string
    page?: number
    pageCount?: number,
    isMyCardsPack?: boolean
}