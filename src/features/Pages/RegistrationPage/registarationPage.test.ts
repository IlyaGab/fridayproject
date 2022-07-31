import {registrationReducer, setIsRegisteredAC} from "./registrationPageReducer";

test('must be registered in', () => {

    let startState = {
        isRegistered: false
    }

    const endState = registrationReducer(startState, setIsRegisteredAC(true))

    expect(endState.isRegistered).toBeTruthy()
})