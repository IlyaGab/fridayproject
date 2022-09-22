import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react'

import SearchIcon from '@mui/icons-material/Search'
import {InputAdornment} from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput'

import {useDebounce} from '../../hooks/useDebounce'

import styles from './search.module.scss'

export const Search: React.FC<SearchPropsType> = React.memo(
    ({setSearchName, isDisabled}): ReactElement => {
        const [value, setValue] = useState('')
        const debounceDelay = 500
        const debouncedValue = useDebounce<string>(value, debounceDelay)

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
            setValue(e.currentTarget.value)
        }

        useEffect(() => {
            setSearchName(debouncedValue)
        }, [debouncedValue, setSearchName])

        return (
            <div className={styles.search}>
                <h3>Search</h3>
                <OutlinedInput
                    value={value}
                    onChange={onChangeHandler}
                    placeholder="Provide your text"
                    className={styles.searchInput}
                    disabled={isDisabled}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
            </div>
        )
    },
)

// Types
type SearchPropsType = {
    setSearchName: (searchName: string) => void
    isDisabled?: boolean
}
