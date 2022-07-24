import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {changePassReducer} from '../features/Pages/ChangePasswordPage/changePassReducer';
import {loginReducer} from '../features/Pages/LoginPage/loginPageReducer';
import {
    passwordRecoveryReducer
} from '../features/Pages/PasswordRecoveryPage/passwordRecoveryPageReducer';
import {ProfileActionType, profileReducer} from '../features/Pages/ProfilePage/profilePageReducer';
import {registrationReducer} from '../features/Pages/RegistrationPage/registrationPageReducer';
import {testReducer} from '../features/Pages/TestPage/testPageSlice';

// type ReducersType = typeof rootReducer
// export type AppStateType = ReturnType<ReducersType>

let rootReducer = combineReducers({
    changePassReducer: changePassReducer,
    loginReducer: loginReducer,
    passwordRecoveryReducer: passwordRecoveryReducer,
    profileReducer: profileReducer,
    registrationReducer: registrationReducer,
    testReducer: testReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


// TYPES

export type RootState = ReturnType<typeof store.getState>

type AppActionType = ProfileActionType
export type AppThunkType = ThunkAction<void, RootState, unknown, AppActionType>
export type AppDispatchType = ThunkDispatch<RootState, unknown, AppActionType>
