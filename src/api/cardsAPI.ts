import {instance} from './istanceSettings'

export const cardsAPI = {
    getCards(queryParams: QueryParamsCardsType) {
        const params = queryParams

        return instance.get<GetCardsResponseType>('cards/card', {params})
    },
    createCard(card: CardPostType) {
        return instance.post('cards/card', {card})
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
    },
    changeCard(card: CardPutType) {
        return instance.put('cards/card', {card})
    },
}

// Types
export type GetCardsResponseType = {
    cardPacks: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
    questionImg: string
    answerImg: string
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

export type CardPutType = {
    answer?: string
    question?: string
    cardsPack_id?: string
    grade?: number
    shots?: number
    user_id?: string
    created?: string
    updated?: string
    answerImg?: string
    questionImg?: string
    _id: string
}
