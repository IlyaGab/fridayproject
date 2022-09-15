import {
    CardPostType,
    CardPutType,
    cardsAPI,
    CardType,
    GetCardsResponseType,
} from '../../../api/cardsAPI'
import {gradeAPI, GradeParamsType} from '../../../api/gradeAPI'
import {setAppStatusAC} from '../../../app/appReducer'
import {AppThunkType} from '../../../app/store'
import {handleServerNetworkError} from '../../../common/utils/error-utils'

const initialState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: '',
    queryParams: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 5,
        sortCards: '0grade',
        page: 1,
        pageCount: 5,
    },
    infoCardsPack: {
        packName: '',
        isMyCards: false,
        deckCover: '',
        cardsCount: 0,
    },
}

export const cardsListReducer = (
    state: InitialStateType = initialState,
    action: CardsListActionType,
): InitialStateType => {
    switch (action.type) {
        case 'CARDS-LIST/GET-CARDS-LIST':
            return {
                ...state,
                ...action.payload.data,
            }
        case 'CARDS-LIST/SET-QUERY-PARAMS':
            return {
                ...state,
                queryParams: {
                    ...state.queryParams,
                    ...action.payload,
                },
            }
        case 'CARDS-LIST/SET-INFO-CARDS-PACK':
            return {
                ...state,
                infoCardsPack: {
                    ...state.infoCardsPack,
                    ...action.payload.infoCardsPack,
                },
            }
        case 'CARDS-LIST/UPDATE-GRADE':
            return {
                ...state,
                cards: state.cards.map(card =>
                    card._id === action.payload.updatedGrade.card_id
                        ? {
                              ...card,
                              grade: action.payload.updatedGrade.grade,
                              shots: action.payload.updatedGrade.shots,
                          }
                        : card,
                ),
            }
        default:
            return state
    }
}

// AC
export const getCardsListAC = (data: GetCardsResponseType) =>
    ({
        type: 'CARDS-LIST/GET-CARDS-LIST',
        payload: {
            data,
        },
    } as const)

export const setCardsQueryParamsAC = (queryParams: CardsQueryParamsActionType) =>
    ({
        type: 'CARDS-LIST/SET-QUERY-PARAMS',
        payload: {
            ...queryParams,
        },
    } as const)

export const setInfoCardsPackAC = (infoCardsPack: InfoCardsPackType) =>
    ({
        type: 'CARDS-LIST/SET-INFO-CARDS-PACK',
        payload: {
            infoCardsPack,
        },
    } as const)

export const updateGradeAC = (updatedGrade: UpdateGradeType) =>
    ({
        type: 'CARDS-LIST/UPDATE-GRADE',
        payload: {
            updatedGrade,
        },
    } as const)

// TC
export const getCardsListTC = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.getCards(getState().cardsList.queryParams)

        dispatch(getCardsListAC(res.data))
        const isMyCards = getState().cardsList.packUserId === getState().profile._id

        dispatch(setInfoCardsPackAC({isMyCards}))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setAppStatusAC('failed'))
    }
}

export const createCardTC =
    (card: CardPostType): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            await cardsAPI.createCard(card)
            await dispatch(getCardsListTC())
            dispatch(setAppStatusAC('succeeded'))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    }

export const deleteCardTC =
    (id: string): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            await cardsAPI.deleteCard(id)
            await dispatch(getCardsListTC())
            dispatch(setAppStatusAC('succeeded'))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    }

export const changeCardTC =
    (card: CardPutType): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            await cardsAPI.changeCard(card)
            await dispatch(getCardsListTC())
            dispatch(setAppStatusAC('succeeded'))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    }

export const updateGradeTC =
    (gradeParams: GradeParamsType): AppThunkType =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await gradeAPI.updateGrade(gradeParams)

            dispatch(updateGradeAC(res.data.updatedGrade))
            dispatch(setAppStatusAC('succeeded'))
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    }

// Types
export type CardsListActionType =
    | ReturnType<typeof getCardsListAC>
    | ReturnType<typeof setCardsQueryParamsAC>
    | ReturnType<typeof setInfoCardsPackAC>
    | ReturnType<typeof updateGradeAC>

type InitialStateType = typeof initialState

type CardsQueryParamsActionType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

type InfoCardsPackType = {
    packName?: string
    isMyCards?: boolean
    deckCover?: string
    cardsCount?: number
}

type UpdateGradeType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
    created: string
    more_id: string
    updated: string
    __v: number
}
