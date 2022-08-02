import {instance} from './istanceSettings';



export const cardsAPI = {
    getCards(queryParams: QueryParamsCardsType,id:string) {
        return instance.get<GetCardsResponseType>(`cards/card?cardAnswer=${queryParams.cardAnswer}&cardQuestion=${queryParams.cardQuestion}&cardsPack_id=${id}&min=${queryParams.min}&max=${queryParams.max}&sortCards=${queryParams.sortCards}${queryParams.sortNameCards}&page=${queryParams.page}&pageCount=${queryParams.pageCount}`)
    },
}

export type GetCardsResponseType = {
    cardPacks: CardsType[]
    cardsTotalcount:number
    maxGrade:number
    minGrade:number
    page:number
    packUserId:string
}

export type CardsType = {
    answer:string
    question:string
    cardsPack_id:string
    grade:number
    shots:number
    user_id:string
    created:string
    updated:string
    _id:string
}

export type CardsPostType = {
    cardsPack_id:string
    question:string
    answer:string
    grade:number
    shots:number
    answerImg:string
    questionImg:string
    questionVideo:string
    answerVideo:string
}

export type QueryParamsCardsType = {
    cardAnswer:string
    cardQuestion:string
    cardsPack_id:string
    min:number
    max:number
    sortCards:number
    sortNameCards:string
    page:number
    pageCount:number
}