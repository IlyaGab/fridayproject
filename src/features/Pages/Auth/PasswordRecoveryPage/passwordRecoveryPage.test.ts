import {
    passwordRecoveryReducer,
    setIsSendMessageToEmailAC,
} from './passwordRecoveryPageReducer'

test('the data should set correctly', () => {
    const startState = {
        isSendMessageToEmail: false,
    }

    const endState = passwordRecoveryReducer(startState, setIsSendMessageToEmailAC(true))

    expect(endState.isSendMessageToEmail).toBe(true)
})
