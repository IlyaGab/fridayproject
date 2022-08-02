import {cardsAPI, CardsType, GetCardsResponseType} from '../../../api/cardsAPI'
import {AppStateType, AppThunkType} from '../../../app/store'

const initialState = {
    cards: [] as CardsType[],
    cardsTotalcount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    packUserId: '',
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
export const getCardsListTC = (id:string): AppThunkType => (dispatch, getState: () => AppStateType) => {
    cardsAPI.getCards(getState().cardsList.queryParams, id)
        .then((res) => {
           dispatch(getCardsListAC(res.data))
        })
}


//Types
export type CardsListActionType = ReturnType<typeof getCardsListAC>
type InitialStateType = typeof initialState