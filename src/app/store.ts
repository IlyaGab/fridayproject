import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'
import { changePassReducer } from '../features/Pages/ChangePasswordPage/changePassSlice';
import {loginReducer } from '../features/Pages/LoginPage/loginPageSlice';
import { passwordRecoveryReducer } from '../features/Pages/PasswordRecoveryPage/passwordRecoveryPageSlice';
import { profileReducer } from '../features/Pages/ProfilePage/profilePageSlice';
import { registrationReducer } from '../features/Pages/RegistrationPage/registrationPageSlice';
import { testReducer } from '../features/Pages/TestPage/testPageSlice';

type ReducersType = typeof rootReducer
export type AppStateType = ReturnType<ReducersType>

let rootReducer = combineReducers({
    changePassReducer: changePassReducer,
    loginReducer: loginReducer,
    passwordRecoveryReducer: passwordRecoveryReducer,
    profileReducer: profileReducer,
    registrationReducer: registrationReducer,
    testReducer: testReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

