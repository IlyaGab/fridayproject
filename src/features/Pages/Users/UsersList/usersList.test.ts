import {
    getUsersListAC,
    InitialStateType,
    setUsersListQueryParamsAC,
    usersListReducer,
} from './usersListReducer'

let startState: InitialStateType

beforeEach(() => {
    startState = {
        users: [],
        page: 1,
        pageCount: 5,
        usersTotalCount: 5,
        minPublicCardPacksCount: 0,
        maxPublicCardPacksCount: 5,
        token: '',
        tokenDeathTime: 0,
        queryParams: {
            userName: '',
            min: 0,
            max: 10,
            sortUsers: '0publicCardPacksCount',
            page: 1,
            pageCount: 5,
        },
    }
})

test('the data must be get correctly', () => {
    const data = {
        users: [],
        page: 2,
        pageCount: 10,
        usersTotalCount: 5,
        minPublicCardPacksCount: 0,
        maxPublicCardPacksCount: 5,
        token: '',
        tokenDeathTime: 0,
    }

    const endState = usersListReducer(startState, getUsersListAC(data))

    expect(endState.page).toBe(data.page)
    expect(endState.pageCount).toBe(data.pageCount)
})

test('the query params must be changed correctly', () => {
    const queryParams = {
        min: 5,
        max: 20,
    }

    const endState = usersListReducer(startState, setUsersListQueryParamsAC(queryParams))

    expect(endState.queryParams.min).toBe(queryParams.min)
    expect(endState.queryParams.max).toBe(queryParams.max)
    expect(endState.queryParams.page).toBe(startState.queryParams.page)
})
