import { cardsAPI, CardsType, GetCardsResponseType } from "../../../api/cardsAPI"
import { AppStateType, AppThunkType } from "../../../app/store"

const initialState = {
    cards: [] as CardsType[],
    cardsTotalcount: 0 as number,
    maxGrade: 0 as number,
    minGrade: 0 as number,
    page: 0 as number,
    packUserId: '' as string,
    queryParams: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 5,
        sortCards: 0,
        sortNameCards: 'grade',
        page: 1,
        pageCount: 10,
        // isMyCardsPack: false
    }
}

export const cardsListReducer = (state: InitialStateType = initialState, action: CardsListActionType): InitialStateType => {
    switch (action.type) {
        case 'CARDS-LIST/GET-CARDS-LIST':
            return {
                ...state, ...action.payload.data
            }
        default:
            return state
    }
}

//AC
export const getCardsListAC = (data: GetCardsResponseType) => ({
    type: 'CARDS-LIST/GET-CARDS-LIST',
    payload: {
        data
    }
}) as const


//TC
export const getCardsListTC = (): AppThunkType => (dispatch, getState: () => AppStateType) => {
    cardsAPI.getCards(getState().cardsList.queryParams, getState().profileReducer._id)
        .then((res) => {
           dispatch(getCardsListAC(res.data))
        })
}



//Types
export type CardsListActionType = ReturnType<typeof getCardsListAC> 

type InitialStateType = typeof initialState