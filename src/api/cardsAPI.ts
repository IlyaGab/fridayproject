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
    cards: CardType[]
    packUserId: string
    packName: string
    packPrivate: boolean
    packCreated: string
    packUpdated: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}

export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    questionImg: string
    answerImg: string
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
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
