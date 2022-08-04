import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import styles from './search.module.scss';
import {InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useDebounce} from '../../hooks/useDebounce';
import {getPackListTC, setQueryParamsAC} from '../../../features/Pages/PacksList/packsListReducer';
import {getCardsListTC, setQueryParamsForCardsListAC} from '../../../features/Pages/CardsList/cardsListReducer';
import {useAppSelector} from '../../hooks/useAppSelector';

type SearchPropsType = {
    listType: 'packsList' | 'cardsList'
}

export const Search: React.FC<SearchPropsType> = ({listType}): ReactElement => {
    const [value, setValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const cardsListId = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)
    const debouncedValue = useDebounce<string>(value, 500)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.currentTarget.value);
    }

    const searchInputClassName = listType === 'packsList' ? styles.searchInputForPacksList : styles.searchInputForCardsList

    useEffect(() => {
        if (listType === 'packsList') {
            dispatch(setQueryParamsAC({packName: debouncedValue}))
            dispatch(getPackListTC())
        } else {
            dispatch(setQueryParamsForCardsListAC({cardQuestion: debouncedValue}))
            dispatch(getCardsListTC(cardsListId))
        }
    }, [dispatch, debouncedValue])

    return (
        <div className={styles.search}>
            <h3>Search</h3>
            <OutlinedInput
                value={value}
                onChange={onChangeHandler}
                placeholder="Provide your text"
                className={searchInputClassName}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                }
            />
        </div>
    )
}