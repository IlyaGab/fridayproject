import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import React, {ChangeEvent, ReactElement, useLayoutEffect, useRef, useState} from 'react';
import styles from './search.module.scss';
import {InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useDebounce} from '../../hooks/useDebounce';
import {getPackListTC, setQueryParamsAC} from '../../../features/Pages/PacksList/packsListReducer';
import {getCardsListTC, setCardsQueryParamsAC} from '../../../features/Pages/CardsList/cardsListReducer';

type SearchPropsType = {
    listType: 'packsList' | 'cardsList'
}

export const Search: React.FC<SearchPropsType> = React.memo( ({listType}): ReactElement => {
    const [value, setValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const debouncedValue = useDebounce<string>(value, 500)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.currentTarget.value);
    }

    const searchInputClassName = listType === 'packsList' ? styles.searchInputForPacksList : styles.searchInputForCardsList

    const firstUpdateSearch = useRef<boolean>(true)
    useLayoutEffect(() => {
        console.log('search')
        if (firstUpdateSearch.current) {
            firstUpdateSearch.current = false
            return
        }
        if (listType === 'packsList') {
            dispatch(setQueryParamsAC({packName: debouncedValue}))
            dispatch(getPackListTC())
        } else {
            dispatch(setCardsQueryParamsAC({cardQuestion: debouncedValue}))
            dispatch(getCardsListTC())
        }
    }, [listType, dispatch, debouncedValue])


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
})