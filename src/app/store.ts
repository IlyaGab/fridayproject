import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {changePassReducer} from '../features/Pages/ChangePasswordPage/changePassReducer';
import {loginReducer} from '../features/Pages/LoginPage/loginPageReducer';
import {
    PasswordRecoveryActionsType,
    passwordRecoveryReducer
} from '../features/Pages/PasswordRecoveryPage/passwordRecoveryPageReducer';
import {ProfileActionType, profileReducer} from '../features/Pages/ProfilePage/profilePageReducer';
import {RegisterActionsType, registrationReducer} from '../features/Pages/RegistrationPage/registrationPageReducer';
import {AppActionsType, appReducer} from './appReducer';
import {testReducer} from '../features/Pages/TestPage/testPageReducer';

const rootReducer = combineReducers({
    changePassReducer: changePassReducer,
    loginReducer: loginReducer,
    passwordRecoveryReducer: passwordRecoveryReducer,
    profileReducer: profileReducer,
    registrationReducer: registrationReducer,
    testReducer: testReducer,
    appReducer: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType = AppActionsType | RegisterActionsType | ProfileActionType | PasswordRecoveryActionsType

export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AppRootActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppRootActionsType>