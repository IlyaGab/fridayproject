import React, {ReactElement, useCallback, useEffect, useState} from 'react';
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
import {AddNewPackModal} from '../../Modals/packsModals/AddNewPackModal';

export const PacksList = (): ReactElement => {
    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const cardPacksTotalCount = useAppSelector(state => state.packsList.cardPacksTotalCount)
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)
    const sortPacks = useAppSelector(state => state.packsList.queryParams.sortPacks)

    const stateMin = useAppSelector(state => state.packsList.queryParams.min)
    const stateMax = useAppSelector(state => state.packsList.queryParams.max)
    const statePage = useAppSelector(state => state.packsList.queryParams.page)
    const statePageCount = useAppSelector(state => state.packsList.queryParams.pageCount)

    const [searchParams] = useSearchParams()
    const user_id = searchParams.get("user_id")
    const page = Number(searchParams.get("page")) || statePage
    const pageCount = Number(searchParams.get("pageCount")) || statePageCount

    useEffect(() => {
        dispatch(getPackListTC())
    }, [dispatch, sortPacks, stateMin, stateMax, page, pageCount, user_id])

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
                <HeaderPacksList setIsModalOpen={setIsModalOpen}/>
                <Options/>
                <TablePacks/>
                <Pagination page={page} pageCount={pageCount} cardPacksTotalCount={cardPacksTotalCount}
                            changePagination={changePagination}/>
                <AddNewPackModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>
        </div>
    )
}