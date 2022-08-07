import {
    CardPostType,
    CardPutType,
    cardsAPI,
    CardType,
    GetCardsResponseType
} from "../../../api/cardsAPI"
import {AppStateType, AppThunkType} from "../../../app/store"
import {setAppStatusAC} from "../../../app/appReducer";
import {handleServerNetworkError} from "../../../common/utils/error-utils";

const initialState = {
    cards: [] as CardType[],
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
    infoCardsPack: {
        packName: "",
        cardsCount: 0,
        isMyCards: false,
        packId: ""
    }
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
        case "CARDS-LIST/SET-INFO-CARDS-PACK":
            return {
                ...state,
                infoCardsPack: {
                    ...state.infoCardsPack,
                    ...action.payload.infoCardsPack
                }
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

export const setInfoCardsPackAC = (infoCardsPack: InfoCardsPackType) => ({
    type: "CARDS-LIST/SET-INFO-CARDS-PACK",
    payload: {
        infoCardsPack
    }
}) as const

//TC
export const getCardsListTC = (): AppThunkType => async (dispatch, getState: () => AppStateType) => {
    try {
        dispatch(setAppStatusAC("loading"))
        const res = await cardsAPI.getCards(getState().cardsList.queryParams)
        dispatch(getCardsListAC(res.data))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    }
}

export const createCardTC = (card: CardPostType): AppThunkType => async (dispatch, getState: () => AppStateType) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await cardsAPI.createCard(card)
        dispatch(setInfoCardsPackAC({cardsCount: getState().cardsList.infoCardsPack.cardsCount + 1}))
        dispatch(getCardsListTC())
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    }
}

export const deleteCardTC = (id: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await cardsAPI.deleteCard(id)
        dispatch(getCardsListTC())
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    }
}

export const changeCardTC = (card: CardPutType): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await cardsAPI.changeCard(card)
        dispatch(getCardsListTC())
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    }
}


//Types
export type CardsListActionType =
    ReturnType<typeof getCardsListAC>
    | ReturnType<typeof setCardsQueryParamsAC>
    | ReturnType<typeof setInfoCardsPackAC>

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

type InfoCardsPackType = {
    packName?: string
    cardsCount?: number
    isMyCards?: boolean
}