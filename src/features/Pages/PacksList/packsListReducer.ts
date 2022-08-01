import {AppThunkType} from "../../../app/store"
import {cardsAPI, CardType, GetCardsResponseType} from "../../../api/cardsAPI"

const initialState = {
    cardPacks: [] as CardType[],
    cardPacksTotalCount: 0 as number,
    maxCardsCount: 0 as number,
    minCardsCount: 0 as number,
    page: 0 as number,
    pageCount: 0 as number,
    token: "" as string,
    tokenDeathTime: 0 as number
}

export const packsListReducer = (state: InitialStateType = initialState, action: PacksListActionType): InitialStateType => {
    switch (action.type) {
        case "PACKS-LIST/GET-PACKS-LIST":
            return {
                ...action.payload.data
            }
        case "PACKS-LIST/GET-MIN-PACKS":
            return {
                ...state, ...state.cardPacks.map(el => el.cardsCount === action.minCardsCount)
            }
        default:
            return state
    }
}

//AC
export const getPacksListAC = (data: GetCardsResponseType) => ({
    type: "PACKS-LIST/GET-PACKS-LIST",
    payload: {
        data
    }
}) as const

export const getMinPacksAC = (minCardsCount:number) => ({
    type: "PACKS-LIST/GET-MIN-PACKS",
        minCardsCount
}) as const

//TC
export const getPackListTC = (queryParams?: string): AppThunkType => (dispatch) => {
    cardsAPI.getCards(queryParams)
        .then((res) => {
            dispatch(getPacksListAC(res.data))
        })
}

export const getMinPacksTC = (queryParams?: string): AppThunkType => (dispatch) => {
    cardsAPI.getCards(queryParams)
        .then((res) => {
            dispatch(getMinPacksAC(res.data.minCardsCount))
        })
}

//Types
export type PacksListActionType = ReturnType<typeof getPacksListAC> | ReturnType<typeof getMinPacksAC>
type InitialStateType = typeof initialState