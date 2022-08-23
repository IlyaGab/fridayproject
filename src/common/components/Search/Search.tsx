import React, {ChangeEvent, ReactElement, useEffect, useState} from 'react'

import SearchIcon from '@mui/icons-material/Search'
import {InputAdornment} from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput'

import {useDebounce} from '../../hooks/useDebounce'

import styles from './search.module.scss'

export const Search: React.FC<SearchPropsType> = React.memo(
    ({setSearchPackName}): ReactElement => {
        const [value, setValue] = useState('')
        // eslint-disable-next-line no-magic-numbers
        const debouncedValue = useDebounce<string>(value, 500)

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
            setValue(e.currentTarget.value)
        }

        useEffect(() => {
            setSearchPackName(debouncedValue)
        }, [debouncedValue])

        return (
            <div className={styles.search}>
                <h3>Search</h3>
                <OutlinedInput
                    value={value}
                    onChange={onChangeHandler}
                    placeholder="Provide your text"
                    className={styles.searchInputForPacksList}
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
    setSearchPackName: (searchName: string) => void
}
