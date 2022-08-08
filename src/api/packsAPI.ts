import {instance} from './istanceSettings';

export const packsAPI = {
    getCardsPacks(queryParams: QueryParamsPackType, _id:string) {
        const myCardsPack = queryParams.isMyCardsPack ? `&user_id=${_id}`: ''
        return instance.get<GetPacksResponseType>(`cards/pack?packName=${queryParams.packName}&min=${queryParams.min}&max=${queryParams.max}&sortPacks=${queryParams.sortPacks}${queryParams.sortPacksName}&page=${queryParams.page}&pageCount=${queryParams.pageCount}${myCardsPack}`)
    },
    createCardsPack(newCardsPack: CardsPackType) {
        return instance.post('cards/pack', {cardsPack: newCardsPack})
    },
    deleteCardsPack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    changeNameCardsPack(_id: string, name: string) {
        return instance.put('cards/pack', {cardsPack: {_id, name}})
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
    deckCover: null
}

export type CardsPackType = {
    name?: string
    deckCover?: string
    private?: boolean
}

export type QueryParamsPackType = {
    packName: string,
    min: number,
    max: number,
    sortPacks: number,
    sortPacksName: string,
    page: number,
    pageCount: number,
    isMyCardsPack:boolean
}