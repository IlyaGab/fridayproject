import {instance} from './istanceSettings';

export const packsAPI = {
    getCardsPacks(queryParams: QueryParamsPackType) {
        const params = queryParams
        return instance.get<GetPacksResponseType>('cards/pack', {params})
    },
    createCardsPack(newCardsPack: CardsPackPostType) {
        return instance.post('cards/pack', {cardsPack: newCardsPack})
    },
    deleteCardsPack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    changeNameCardsPack(newPackData: CardsPackPutType) {
        return instance.put('cards/pack', {cardsPack: newPackData})
    }
}

//Types
export type GetPacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type PackType = {
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
    deckCover: string
}

export type CardsPackPostType = {
    name?: string
    deckCover?: string
    private?: boolean
}

export type QueryParamsPackType = {
    packName: string,
    min: number,
    max: number,
    sortPacks: string,
    page: number,
    pageCount: number,
    user_id: string
}

export type CardsPackPutType = {
    _id: string
    user_id?: string
    user_name?: string
    private?: boolean
    name?: string
    path?: string
    grade?: number
    shots?: number
    cardsCount?: number
    type?: string
    rating?: number
    created?: string
    updated?: string
    more_id?: string
    __v?: number
    deckCover?: string
}