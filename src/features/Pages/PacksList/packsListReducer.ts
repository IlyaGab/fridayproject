import {AppThunkType} from "../../../app/store"
import {cardsAPI, CardsPackType, CardType, GetCardsResponseType} from "../../../api/cardsAPI"

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
type InitialStateType = typeof initialState