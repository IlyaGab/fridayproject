import {AppThunkType} from '../../../../app/store';

const initialState: InitialStateType = {
    packName: undefined,
    min: undefined,
    max: undefined,
    sortPacks: undefined,
    page: undefined,
    pageCount: 4,
    user_id: undefined,
}

const optionsReducer = (state: InitialStateType = initialState, action: any) => {
    switch (action.type) {
        case 'CHANGE-SEARCH-VALUE':
            return {...state, packName: action.packName}
        default:
            return state
    }
}


// AC
export const changeSearchValueAC = (packName: string) => ({type: 'CHANGE-SEARCH-VALUE', packName})


// TC
export const changeSearchValueTC = (value: string): AppThunkType => (dispatch) => {

}


// Types
export type InitialStateType = {
    packName: string | undefined;
    min: number | undefined;
    max: number | undefined;
    sortPacks: string | undefined;
    page: number | undefined;
    pageCount: number | undefined;
    user_id: string | undefined;
}


