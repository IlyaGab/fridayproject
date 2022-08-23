import React, {ReactElement} from "react";
import styles from "./options.module.scss";
import {Search} from "../../../../common/components/Search/Search";
import {ShowPacksCards} from "./ShowPacksCards/ShowPacksCards";
import {NumberOfCards} from "./NumberOfCards/NumberOfCards";
import {setQueryParamsAC} from "../packsListReducer";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";

export const Options = (): ReactElement => {
    const dispatch = useAppDispatch()

    const setSearchPackName = (searchName: string): void => {
        dispatch(setQueryParamsAC({packName: searchName}))
    }

    return (
        <div className={styles.options}>
            <Search setSearchPackName={setSearchPackName}/>
            <ShowPacksCards/>
            <NumberOfCards/>
        </div>
    )
}