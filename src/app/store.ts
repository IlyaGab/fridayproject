import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'
import { changePassReducer } from '../features/Pages/ChangePasswordPage/changePassReducer';
import {loginReducer } from '../features/Pages/LoginPage/loginPageReducer';
import { passwordRecoveryReducer } from '../features/Pages/PasswordRecoveryPage/passwordRecoveryPageReducer';
import { profileReducer } from '../features/Pages/ProfilePage/profilePageReducer';
import { registrationReducer } from '../features/Pages/RegistrationPage/registrationPageReducer';
import { testReducer } from '../features/Pages/TestPage/testPageSlice';
import {appReducer} from './appReducer';

type ReducersType = typeof rootReducer
export type AppRootStateType = ReturnType<ReducersType>

let rootReducer = combineReducers({
    appReducer:appReducer,
    changePassReducer: changePassReducer,
    loginReducer: loginReducer,
    passwordRecoveryReducer: passwordRecoveryReducer,
    profileReducer: profileReducer,
    registrationReducer: registrationReducer,
    testReducer: testReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

