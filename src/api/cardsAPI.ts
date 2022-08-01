import {instance} from "./istanceAPI";

export const cardsAPI = {
    getCards(queryParams: string = "") {
        return instance.get<GetCardsResponseType>("cards/pack" + queryParams)
    },
    createCardsPack(newCardsPack: CardsPackType) {
        return instance.post("cards/pack", {cardsPack: newCardsPack})
    },
    deleteCardsPack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    changeNameCardsPack(_id: string, name: string) {
        return instance.put("cards/pack", {cardsPack: {_id, name}})
    }
}

//Types
export type GetCardsResponseType = {
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

export type CardsPackType = {
    name?: string
    deckCover?: string
    private?: boolean
}