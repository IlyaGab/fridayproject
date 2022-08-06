import React, {ReactElement, useCallback} from "react";
import styles from "./packsList.module.scss"
import {Options} from "./Options/Options";
import {TablePacks} from "./TablePacks/TablePacks";
import {Pagination} from "../../../common/components/Pagination/Pagination";
import {HeaderPacksList} from "./HeaderPacksList/HeaderPacksList";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {setQueryParamsAC} from "./packsListReducer";
import {useAppSelector} from "../../../common/hooks/useAppSelector";

export const PacksList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const cardPacksTotalCount = useAppSelector(state => state.packsList.cardPacksTotalCount)

    const changePagination = useCallback(
        (page: number, pageCount: number) => {
            dispatch(setQueryParamsAC({page, pageCount}))
        }, [dispatch])

    return (
        <div className={styles.packsListPage}>
            <div className={styles.container}>
                <HeaderPacksList/>
                <Options/>
                <TablePacks/>
                <Pagination cardPacksTotalCount={cardPacksTotalCount} changePagination={changePagination}/>
            </div>
        </div>
    )
}