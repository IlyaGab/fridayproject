import {
    getPacksListAC,
    InitialStateType,
    packsListReducer,
    setIsMyCardsPackAC,
    setPacksListQueryParamsAC,
} from './packsListReducer'

let startState: InitialStateType

beforeEach(() => {
    startState = {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,
        pageCount: 0,
        token: '',
        tokenDeathTime: 0,
        queryParams: {
            packName: '',
            min: 0,
            max: 110,
            sortPacks: '0updated',
            page: 1,
            pageCount: 5,
            user_id: '',
        },
        isMyCardsPack: false,
    }
})

test('the data must be get correctly', () => {
    const data = {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 2,
        minCardsCount: 1,
        page: 0,
        pageCount: 0,
        token: '',
        tokenDeathTime: 0,
    }

    const endState = packsListReducer(startState, getPacksListAC(data))

    expect(endState.maxCardsCount).toBe(data.maxCardsCount)
    expect(endState.minCardsCount).toBe(data.minCardsCount)
})

test('the query params must be changed correctly', () => {
    const queryParams = {
        packName: 'NewPackName',
        page: 2,
    }

    const endState = packsListReducer(startState, setPacksListQueryParamsAC(queryParams))

    expect(endState.queryParams.packName).toBe(queryParams.packName)
    expect(endState.queryParams.page).toBe(queryParams.page)
    expect(endState.queryParams.max).toBe(startState.queryParams.max)
})

test('the parameter isMyCardsPack must be changed correctly', () => {
    const isMyCardsPack = true

    const endState = packsListReducer(startState, setIsMyCardsPackAC(isMyCardsPack))

    expect(endState.isMyCardsPack).toBeTruthy()
})
