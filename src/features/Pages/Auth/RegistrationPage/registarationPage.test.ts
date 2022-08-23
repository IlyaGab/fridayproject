import {registrationReducer, setIsRegisteredAC} from './registrationPageReducer'

test('must be registered in', () => {
    const startState = {
        isRegistered: false,
    }

    const endState = registrationReducer(startState, setIsRegisteredAC(true))

    expect(endState.isRegistered).toBeTruthy()
})
