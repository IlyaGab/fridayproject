import {instance} from "./istanceAPI";

export const cardsAPI = {
    getCards() {
        return instance.get<GetCardsResponseType>("cards/pack")
    }
}

//Types
type GetCardsResponseType = {
    cardPacks: CardType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
    deckCover: null
}