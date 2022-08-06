import {instance} from "./istanceSettings";

export const cardsAPI = {
    getCards(queryParams: QueryParamsCardsType) {
        const params = queryParams
        return instance.get<GetCardsResponseType>("cards/card", {params})
    },
    createCard(card: CardPostType) {
        return instance.post("cards/card", {card})
    }
}

export type GetCardsResponseType = {
    cardPacks: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type CardPostType = {
    cardsPack_id?: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type QueryParamsCardsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}