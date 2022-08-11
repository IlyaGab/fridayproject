import React, {ReactElement, useCallback, useEffect} from "react";
import styles from "./packsList.module.scss"
import {Options} from "./Options/Options";
import {TablePacks} from "./TablePacks/TablePacks";
import {HeaderPacksList} from "./HeaderPacksList/HeaderPacksList";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {getPackListTC, setQueryParamsAC} from "./packsListReducer";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {Navigate, useSearchParams} from "react-router-dom";
import {PATH} from "../../../common/components/RoutesList/RoutersList";
import {Pagination} from "../../../common/components/Pagination/Pagination";

export const PacksList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const cardPacksTotalCount = useAppSelector(state => state.packsList.cardPacksTotalCount)
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)
    const sortPacks = useAppSelector(state => state.packsList.queryParams.sortPacks)

    const [searchParams] = useSearchParams()
    const user_id = searchParams.get("user_id")
    const min = searchParams.get("min")
    const max = searchParams.get("max")
    const page = searchParams.get("page")
    const pageCount = searchParams.get("pageCount")

    useEffect(() => {
        dispatch(getPackListTC())
    }, [dispatch, sortPacks, min, max, page, pageCount, user_id])

    const changePagination = useCallback(
        (page?: number, pageCount?: number) => {
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
                <Pagination cardPacksTotalCount={cardPacksTotalCount}
                            changePagination={changePagination}/>
            </div>
        </div>
    )
}