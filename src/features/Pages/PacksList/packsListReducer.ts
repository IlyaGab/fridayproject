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
    tokenDeathTime: 0 as number,
}

export const packsListReducer = (state: InitialStateType = initialState, action: PacksListActionType): InitialStateType => {
    switch (action.type) {
        case "PACKS-LIST/GET-PACKS-LIST":
            return {
                ...action.payload.data
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

//TC
export const getPackListTC = (queryParams?: string): AppThunkType => (dispatch) => {
    cardsAPI.getCards(queryParams)
        .then((res) => {
            dispatch(getPacksListAC(res.data))
        })
}

//Types
export type PacksListActionType = ReturnType<typeof getPacksListAC>
type InitialStateType = typeof initialState