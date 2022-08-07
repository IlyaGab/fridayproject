import {AppStateType, AppThunkType} from "../../../app/store"
import {CardsPackType, GetPacksResponseType, packsAPI, PackType} from "../../../api/packsAPI"
import {setAppStatusAC} from "../../../app/appReducer";
import {handleServerNetworkError} from "../../../common/utils/error-utils";

const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
    token: "",
    tokenDeathTime: 0,
    queryParams: {
        packName: "",
        min: 0,
        max: 110,
        sortPacks: "0updated",
        page: 1,
        pageCount: 5,
        user_id: ""
    },
    isMyCardsPack: false
}

export const packsListReducer = (state: InitialStateType = initialState, action: PacksListActionType): InitialStateType => {
    switch (action.type) {
        case "PACKS-LIST/GET-PACKS-LIST":
            return {
                ...state, ...action.payload.data
            }
        case "PACKS-LIST/SET-QUERY-PARAMS":
            return {
                ...state, queryParams: {
                    ...state.queryParams,
                    ...action.payload
                }
            }
        default:
            return state
    }
}

//AC
export const getPacksListAC = (data: GetPacksResponseType) => ({
    type: "PACKS-LIST/GET-PACKS-LIST",
    payload: {
        data
    }
}) as const

export const setQueryParamsAC = (queryParams: QueryParamsThunkType) => ({
    type: "PACKS-LIST/SET-QUERY-PARAMS",
    payload: {
        ...queryParams
    }
}) as const

//TC
export const getPackListTC = (): AppThunkType => async (dispatch, getState: () => AppStateType) => {
    try {
        dispatch(setAppStatusAC("loading"))
        const res = await packsAPI.getCardsPacks(getState().packsList.queryParams)
        dispatch(getPacksListAC(res.data))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    }
}

export const createCardsPackTC = (newCardsPack: CardsPackType): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await packsAPI.createCardsPack(newCardsPack)
        dispatch(getPackListTC())
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    }
}

export const deleteCardsPackTC = (id: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await packsAPI.deleteCardsPack(id)
        dispatch(getPackListTC())
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    }

}

export const changeNameCardsPackTC = (id: string, name: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await packsAPI.changeNameCardsPack(id, name)
        dispatch(getPackListTC())
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC("failed"))
    }
}

//Types
export type PacksListActionType = ReturnType<typeof getPacksListAC>
    | ReturnType<typeof setQueryParamsAC>
type InitialStateType = typeof initialState
type QueryParamsThunkType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number,
    user_id?: string
}