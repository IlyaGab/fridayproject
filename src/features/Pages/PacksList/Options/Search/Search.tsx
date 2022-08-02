import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import styles from './search.module.scss';
import {InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch';
import {useDebounce} from '../../../../../common/hooks/useDebounce';
import {getPackListTC, setQueryParamsAC} from '../../packsListReducer';

export const Search = (): ReactElement => {
    const [value, setValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const debouncedValue = useDebounce<string>(value, 500)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.currentTarget.value);
    }

    useEffect(() => {
        dispatch(setQueryParamsAC({packName:debouncedValue}))
        dispatch(getPackListTC())
    }, [dispatch, debouncedValue])

    return (
        <div className={styles.search}>
            <h3 className={styles.searchTitle}>Search</h3>
            <OutlinedInput
                value={value}
                onChange={onChangeHandler}
                placeholder="Provide your text"
                className={styles.input}
                startAdornment={
                    <InputAdornment position="start" >
                        <SearchIcon />
                    </InputAdornment>
                }
            />
        </div>
    )
}