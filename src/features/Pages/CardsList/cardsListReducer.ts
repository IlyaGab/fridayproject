import {cardsAPI, CardsType, GetCardsResponseType} from '../../../api/cardsAPI'
import {AppStateType, AppThunkType} from '../../../app/store'

const initialState = {
    cards: [] as CardsType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    packUserId: '',
    queryParams: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 5,
        sortCards: 0,
        sortNameCards: 'grade',
        page: 1,
        pageCount: 10,
        // isMyCardsPack: false
    }
}

export const cardsListReducer = (state: InitialStateType = initialState, action: CardsListActionType): InitialStateType => {
    switch (action.type) {
        case 'CARDS-LIST/GET-CARDS-LIST':
            return {
                ...state, ...action.payload.data
            }
        case 'CARDS-LIST/SET-QUERY-PARAMS':
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
export const getCardsListAC = (data: GetCardsResponseType) => ({
    type: 'CARDS-LIST/GET-CARDS-LIST',
    payload: {
        data
    }
}) as const

export const setQueryParamsForCardsListAC = (queryParams: QueryParamsThunkType) => ({
    type: 'CARDS-LIST/SET-QUERY-PARAMS',
    payload: {
        ...queryParams
    }
}) as const


//TC
export const getCardsListTC = (id: string): AppThunkType => (dispatch, getState: () => AppStateType) => {
    cardsAPI.getCards(getState().cardsList.queryParams, id)
        .then((res) => {
            dispatch(getCardsListAC(res.data))
        })
}


//Types
export type CardsListActionType = ReturnType<typeof getCardsListAC> | ReturnType<typeof setQueryParamsForCardsListAC>
type InitialStateType = typeof initialState

type QueryParamsThunkType = {
    cardAnswer?: string,
    cardQuestion?: string,
    cardsPack_id?: string,
    min?: number,
    max?: number,
    sortCards?: number,
    sortNameCards?: string,
    page?: number,
    pageCount?: number,
}
