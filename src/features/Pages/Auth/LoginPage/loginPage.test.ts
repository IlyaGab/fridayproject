import {loginReducer, setIsLoggedInAC} from './loginPageReducer'

test('must be logged in', () => {
    const startState = {
        isLoggedIn: false,
    }

    const endState = loginReducer(startState, setIsLoggedInAC(true))

    expect(endState.isLoggedIn).toBeTruthy()
})
