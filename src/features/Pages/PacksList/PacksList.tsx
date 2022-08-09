import React, {ReactElement, useCallback} from "react";
import styles from "./packsList.module.scss"
import {Options} from "./Options/Options";
import {TablePacks} from "./TablePacks/TablePacks";
import {HeaderPacksList} from "./HeaderPacksList/HeaderPacksList";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {setQueryParamsAC} from "./packsListReducer";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../common/components/RoutesList/RoutersList";
import {Pagination} from "../../../common/components/Pagination/Pagination";

export const PacksList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const cardPacksTotalCount = useAppSelector(state => state.packsList.cardPacksTotalCount)
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)

    const changePagination = useCallback(
        (page: number, pageCount: number) => {
            dispatch(setQueryParamsAC({page, pageCount}))
        }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={PATH.Login}/>
    }

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