import {
    getUserInfoAC,
    InitialStateType,
    setUserProfileQueryParamsAC,
    userProfileReducer,
} from './userProfileReducer'

let startState: InitialStateType

beforeEach(() => {
    startState = {
        _id: '',
        email: '',
        isAdmin: false,
        name: '',
        verified: false,
        publicCardPacksCount: 0,
        created: '',
        updated: '',
        avatar: '',
        queryParams: {
            id: '',
        },
    }
})

test('the data must be get correctly', () => {
    const data = {
        _id: '1',
        email: 'newData@gmail.com',
        isAdmin: false,
        name: 'newData',
        verified: false,
        publicCardPacksCount: 0,
        created: '2021',
        updated: '2022',
        avatar: 'avatar',
    }

    const endState = userProfileReducer(startState, getUserInfoAC(data))

    expect(endState.name).toBe(data.name)
    expect(endState.avatar).toBe(data.avatar)
})

test('the query params must be changed correctly', () => {
    const endState = userProfileReducer(startState, setUserProfileQueryParamsAC('newId'))

    expect(endState.queryParams.id).toBe('newId')
})
