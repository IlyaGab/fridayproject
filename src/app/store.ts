import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'

import {
    ChangePasswordActionType,
    changePasswordReducer,
} from '../features/Pages/Auth/ChangePasswordPage/changePasswordReducer'
import {
    LoginActionsType,
    loginReducer,
} from '../features/Pages/Auth/LoginPage/loginPageReducer'
import {
    PasswordRecoveryActionsType,
    passwordRecoveryReducer,
} from '../features/Pages/Auth/PasswordRecoveryPage/passwordRecoveryPageReducer'
import {
    ProfileActionType,
    profileReducer,
} from '../features/Pages/Auth/ProfilePage/profilePageReducer'
import {
    RegisterActionsType,
    registrationReducer,
} from '../features/Pages/Auth/RegistrationPage/registrationPageReducer'
import {
    CardsListActionType,
    cardsListReducer,
} from '../features/Pages/CardsList/cardsListReducer'
import {
    ChatActionType,
    chatReducer,
} from '../features/Pages/PacksList/ChatButton/Chat/chatReducer'
import {
    PacksListActionType,
    packsListReducer,
} from '../features/Pages/PacksList/packsListReducer'
import {
    UserProfileActionType,
    userProfileReducer,
} from '../features/Pages/Users/UserProfile/userProfileReducer'
import {
    UsersListActionType,
    usersListReducer,
} from '../features/Pages/Users/UsersList/usersListReducer'

import {AppActionsType, appReducer} from './appReducer'

const rootReducer = combineReducers({
    changePassReducer: changePasswordReducer,
    login: loginReducer,
    passwordRecovery: passwordRecoveryReducer,
    profile: profileReducer,
    registration: registrationReducer,
    app: appReducer,
    packsList: packsListReducer,
    cardsList: cardsListReducer,
    userProfile: userProfileReducer,
    usersList: usersListReducer,
    chat: chatReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// Types
export type AppStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType =
    | AppActionsType
    | RegisterActionsType
    | ProfileActionType
    | PasswordRecoveryActionsType
    | LoginActionsType
    | ChangePasswordActionType
    | PacksListActionType
    | CardsListActionType
    | UserProfileActionType
    | UsersListActionType
    | ChatActionType

export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AppRootActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AppRootActionsType
>

// @ts-ignore
window.store = store
