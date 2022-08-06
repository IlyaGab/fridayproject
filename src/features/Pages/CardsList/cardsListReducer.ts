import {CardPostType, cardsAPI, CardsType, GetCardsResponseType} from "../../../api/cardsAPI"
import {AppStateType, AppThunkType} from "../../../app/store"
import {setAppStatusAC} from "../../../app/appReducer";

const initialState = {
    cards: [] as CardsType[],
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: "",
    queryParams: {
        cardAnswer: "",
        cardQuestion: "",
        cardsPack_id: "",
        min: 0,
        max: 5,
        sortCards: "0grade",
        page: 1,
        pageCount: 5,
    },
    packName: "",
    cardsCount: 0
}

export const cardsListReducer = (state: InitialStateType = initialState, action: CardsListActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS-LIST/GET-CARDS-LIST":
            return {
                ...state, ...action.payload.data
            }
        case "CARDS-LIST/SET-QUERY-PARAMS":
            return {
                ...state, queryParams: {
                    ...state.queryParams,
                    ...action.payload
                }
            }
        case "CARDS-LIST/SET-PACK-NAME":
            return {
                ...state,
                ...action.payload
            }
        case "CARDS-LIST/SET-CARDS-COUNT":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

//AC
export const getCardsListAC = (data: GetCardsResponseType) => ({
    type: "CARDS-LIST/GET-CARDS-LIST",
    payload: {
        data
    }
}) as const

export const setCardsQueryParamsAC = (queryParams: CardsQueryParamsActionType) => ({
    type: "CARDS-LIST/SET-QUERY-PARAMS",
    payload: {
        ...queryParams
    }
}) as const

export const setPackNameAC = (packName: string) => ({
    type: "CARDS-LIST/SET-PACK-NAME",
    payload: {
        packName
    }
}) as const

export const setCardsCountAC = (cardsCount: number) => ({
    type: "CARDS-LIST/SET-CARDS-COUNT",
    payload: {
        cardsCount
    }
}) as const

//TC
export const getCardsListTC = (): AppThunkType => (dispatch, getState: () => AppStateType) => {
    cardsAPI.getCards(getState().cardsList.queryParams)
        .then((res) => {
            dispatch(getCardsListAC(res.data))
        })
        .finally(()=>{
            dispatch(setAppStatusAC('idle'))
        })
}

export const createCardTC = (card: CardPostType): AppThunkType => (dispatch, getState: () => AppStateType) => {
    cardsAPI.createCard(card)
        .then(() => {
            dispatch(setCardsCountAC(getState().cardsList.cardsCount + 1))
            dispatch(getCardsListTC())
        })
}

//Types
export type CardsListActionType =
    ReturnType<typeof getCardsListAC>
    | ReturnType<typeof setCardsQueryParamsAC>
    | ReturnType<typeof setPackNameAC>
    | ReturnType<typeof setCardsCountAC>

type InitialStateType = typeof initialState

type CardsQueryParamsActionType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}