import {CardType} from '../../../api/cardsAPI'

import {
    cardsListReducer,
    getCardsListAC,
    InitialStateType,
    setCardsQueryParamsAC,
    setInfoCardsPackAC,
} from './cardsListReducer'

let startState: InitialStateType

beforeEach(() => {
    startState = {
        cards: [] as CardType[],
        packUserId: '',
        packName: '',
        packPrivate: false,
        packCreated: '',
        packUpdated: '',
        page: 1,
        pageCount: 5,
        cardsTotalCount: 10,
        minGrade: 0,
        maxGrade: 5,
        token: '',
        tokenDeathTime: 0,
        queryParams: {
            cardAnswer: '',
            cardQuestion: '',
            cardsPack_id: '',
            min: 0,
            max: 5,
            sortCards: '0grade',
            page: 1,
            pageCount: 5,
        },
        infoCardsPack: {
            packName: '',
            isMyCards: false,
            deckCover: '',
            cardsCount: 0,
        },
    }
})

test('the data must be get correctly', () => {
    const data = {
        cards: [],
        packUserId: '',
        packName: '',
        packPrivate: false,
        packCreated: '',
        packUpdated: '',
        page: 2,
        pageCount: 5,
        cardsTotalCount: 10,
        minGrade: 0,
        maxGrade: 10,
        token: '',
        tokenDeathTime: 0,
    }

    const endState = cardsListReducer(startState, getCardsListAC(data))

    expect(endState.maxGrade).toBe(data.maxGrade)
    expect(endState.page).toBe(data.page)
    expect(endState.minGrade).toBe(startState.minGrade)
})

test('the query params must be changed correctly', () => {
    const queryParams = {
        max: 10,
        page: 2,
    }

    const endState = cardsListReducer(startState, setCardsQueryParamsAC(queryParams))

    expect(endState.queryParams.max).toBe(queryParams.max)
    expect(endState.queryParams.page).toBe(queryParams.page)
    expect(endState.queryParams.min).toBe(startState.queryParams.min)
})

test('the parameter isMyCardsPack must be changed correctly', () => {
    const infoCardsPack = {
        packName: 'New Pack Name',
    }
    const endState = cardsListReducer(startState, setInfoCardsPackAC(infoCardsPack))

    expect(endState.infoCardsPack.packName).toBe(infoCardsPack.packName)
})
