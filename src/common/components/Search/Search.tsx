import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import React, {ChangeEvent, ReactElement, useEffect, useState} from "react";
import styles from "./search.module.scss";
import {InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useDebounce} from "../../hooks/useDebounce";

export const Search: React.FC<SearchPropsType> = React.memo( ({setSearchPackName}): ReactElement => {
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.currentTarget.value);
    }

    useEffect(()=>{
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
                        <SearchIcon/>
                    </InputAdornment>
                }
            />
        </div>
    )
})

//Types
type SearchPropsType = {
    setSearchPackName: (searchName: string) => void
}