import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {changePassReducer} from './reducers/changePassReducer';
import {loginReducer} from './reducers/loginReducer';
import {passwordRecoveryReducer} from './reducers/passwordRecoveryReducer';
import {profileReducer} from './reducers/profileReducer';
import {registrationReducer} from './reducers/registrationReducer';
import {testReducer} from './reducers/testReducer';

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

