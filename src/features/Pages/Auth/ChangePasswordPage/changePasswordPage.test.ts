import {changePasswordReducer, isSetNewPasswordAC} from './changePasswordReducer'

test('password change status should change correctly', () => {
    const startState = {
        isSetNewPassword: false,
    }

    const endState = changePasswordReducer(startState, isSetNewPasswordAC(true))

    expect(endState.isSetNewPassword).toBe(true)
})
