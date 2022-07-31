import {AppThunkType} from "../../../app/store";
import {cardsAPI, CardType} from "../../../api/cardsAPI";

const initialState: CardStateType[] = []

export const packsListReducer = (state: CardStateType[] = initialState, action: PacksListActionType): CardStateType[] => {
    switch (action.type) {
        case "PACKS-LIST/GET-PACKS-LIST":
            return action.payload.cardPacks.map(card => ({name: card.name, cards: card.cardsCount, lastUpdates: card.updated, createdBy: card.created}))
        default:
            return state
    }
}

//AC
export const getPacksListAC = (cardPacks: CardType[]) => ({
    type: "PACKS-LIST/GET-PACKS-LIST",
    payload: {
        cardPacks
    }
}) as const

//TC
export const getPackListTC = (): AppThunkType => (dispatch) => {
    cardsAPI.getCards()
        .then((res) => {
            dispatch(getPacksListAC(res.data.cardPacks))
        })
}

//Types
type CardStateType = {
    name: string,
    cards: number,
    lastUpdates: string,
    createdBy: string
}

export type PacksListActionType = ReturnType<typeof getPacksListAC>