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
        case 'PACKS-LIST/SET-QUERY-PARAMS':
            return {
                ...state, queryParams: {
                    ...state.queryParams,
                    ...action.payload
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

export const setQueryParamsAC = (queryParams: QueryParamsThunkType) => ({
    type: 'PACKS-LIST/SET-QUERY-PARAMS',
    payload: {
        ...queryParams
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

export const changeNameCardsPackTC = (id: string, name: string, privateValue: boolean): AppThunkType => (dispatch) => {
    packsAPI.changeNameCardsPack(id, name, privateValue)
        .then(() => {
            dispatch(getPackListTC())
        })
}


//Types
export type PacksListActionType = ReturnType<typeof getPacksListAC>
    | ReturnType<typeof setQueryParamsAC>
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