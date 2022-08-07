import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {
    ChangePasswordActionType,
    changePasswordReducer
} from "../features/Pages/ChangePasswordPage/changePassReducer";
import {LoginActionsType, loginReducer} from "../features/Pages/LoginPage/loginPageReducer";
import {
    passwordRecoveryReducer
} from "../features/Pages/PasswordRecoveryPage/passwordRecoveryPageReducer";
import {
    PasswordRecoveryActionsType
} from "../features/Pages/PasswordRecoveryPage/passwordRecoveryPageReducer";
import {ProfileActionType, profileReducer} from "../features/Pages/ProfilePage/profilePageReducer";
import {
    RegisterActionsType,
    registrationReducer
} from "../features/Pages/RegistrationPage/registrationPageReducer";
import {AppActionsType, appReducer} from "./appReducer";
import {PacksListActionType, packsListReducer} from "../features/Pages/PacksList/packsListReducer";
import {CardsListActionType, cardsListReducer} from "../features/Pages/CardsList/cardsListReducer";

const rootReducer = combineReducers({
    changePassReducer: changePasswordReducer,
    loginReducer: loginReducer,
    passwordRecoveryReducer: passwordRecoveryReducer,
    profileReducer: profileReducer,
    registrationReducer: registrationReducer,
    appReducer: appReducer,
    packsList: packsListReducer,
    cardsList: cardsListReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

//Types
export type AppStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType =
    AppActionsType
    | RegisterActionsType
    | ProfileActionType
    | PasswordRecoveryActionsType
    | LoginActionsType
    | ChangePasswordActionType
    | PacksListActionType
    | CardsListActionType
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AppRootActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppRootActionsType>