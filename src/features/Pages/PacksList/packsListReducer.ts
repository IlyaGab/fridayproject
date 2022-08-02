import { AppStateType, AppThunkType } from '../../../app/store'
import { cardsAPI, CardsPackType, CardType, GetCardsResponseType } from '../../../api/cardsAPI'

const initialState = {
    cardPacks: [] as CardType[],
    cardPacksTotalCount: 0 as number,
    maxCardsCount: 0 as number,
    minCardsCount: 0 as number,
    page: 0 as number,
    pageCount: 0 as number,
    token: '' as string,
    tokenDeathTime: 0 as number,
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
                ...state, queryParams: {
                    ...state.queryParams, ...action.payload
                }
            }
        case 'PACKS-LIST/SET-PAGE-NUMBER-COUNT':
            return {
                ...state, queryParams: {
                    ...state.queryParams, ...action.payload
                }
            }
        case 'PACKS-LIST/SET-SORT-PACKS':
            return {
                ...state, queryParams: {
                    ...state.queryParams, ...action.payload
                }
            }
        case 'PACKS-LIST/SET-IS-MY-CARDS-PACK':
            return {
                ...state, queryParams: {
                    ...state.queryParams, isMyCardsPack: action.payload.value
                }
            }
        default:
            return state
    }
}

//AC
export const getPacksListAC = (data: GetCardsResponseType) => ({
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

export const setPageNumberCountAC = (page: number, pageCount: number) => ({
    type: 'PACKS-LIST/SET-PAGE-NUMBER-COUNT',
    payload: {
        page, pageCount
    }
}) as const

export const setSortPacksAC = (sortPacks:number, sortPacksName:string) => ({
    type: 'PACKS-LIST/SET-SORT-PACKS',
    payload: {
        sortPacks, sortPacksName
    }
}) as const

export const setIsMyCardsPackAC = (value: boolean) => ({
    type: 'PACKS-LIST/SET-IS-MY-CARDS-PACK',
    payload: {
        value
    }
}) as const



//TC
export const getPackListTC = (): AppThunkType => (dispatch, getState: () => AppStateType) => {
    cardsAPI.getCards(getState().packsList.queryParams, getState().profileReducer._id)
        .then((res) => {
            dispatch(getPacksListAC(res.data))
        })
}

export const createCardsPackTC = (newCardsPack: CardsPackType): AppThunkType => (dispatch) => {
    cardsAPI.createCardsPack(newCardsPack)
        .then(() => {
            dispatch(getPackListTC())
        })
}

export const deleteCardsPackTC = (id: string): AppThunkType => (dispatch) => {
    cardsAPI.deleteCardsPack(id)
        .then(() => {
            dispatch(getPackListTC())
        })
}

export const changeNameCardsPackTC = (id: string, name: string): AppThunkType => (dispatch) => {
    cardsAPI.changeNameCardsPack(id, name)
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
type InitialStateType = typeof initialState