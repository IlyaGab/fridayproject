import React, {ReactElement, useCallback, useEffect, useState} from 'react'

import {Navigate, useSearchParams} from 'react-router-dom'

import {Pagination} from '../../../common/components/Pagination/Pagination'
import {PATH} from '../../../common/components/RoutesList/RoutersList'
import {useAppDispatch} from '../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../common/hooks/useAppSelector'
import {AddNewPackModal} from '../../Modals/PacksModals/AddNewPackModal'

import {ChatButton} from './ChatButton/ChatButton'
import {HeaderPacksList} from './HeaderPacksList/HeaderPacksList'
import {Options} from './Options/Options'
import styles from './packsList.module.scss'
import {getPackListTC, setPacksListQueryParamsAC} from './packsListReducer'
import {TablePacks} from './TablePacks/TablePacks'

export const PacksList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const cardPacksTotalCount = useAppSelector(
        state => state.packsList.cardPacksTotalCount,
    )
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const sortPacks = useAppSelector(state => state.packsList.queryParams.sortPacks)
    const packName = useAppSelector(state => state.packsList.queryParams.packName)
    const stateMin = useAppSelector(state => state.packsList.queryParams.min)
    const stateMax = useAppSelector(state => state.packsList.queryParams.max)
    const statePage = useAppSelector(state => state.packsList.queryParams.page)
    const statePageCount = useAppSelector(state => state.packsList.queryParams.pageCount)

    const [searchParams] = useSearchParams()
    const user_id = searchParams.get('user_id')
    const page = Number(searchParams.get('page')) || statePage
    const pageCount = Number(searchParams.get('pageCount')) || statePageCount

    useEffect(() => {
        dispatch(getPackListTC())
    }, [dispatch, sortPacks, stateMin, stateMax, page, pageCount, user_id, packName])

    const setSearchPackName = useCallback(
        (searchName: string): void => {
            dispatch(setPacksListQueryParamsAC({packName: searchName}))
        },
        [dispatch],
    )

    const changePagination = useCallback(
        (page: number, pageCount: number) => {
            dispatch(setPacksListQueryParamsAC({page, pageCount}))
        },
        [dispatch],
    )

    if (!isLoggedIn) {
        return <Navigate to={PATH.Login} />
    }

    return (
        <div className={styles.packsListPage}>
            <div className={styles.container}>
                <HeaderPacksList setIsModalOpen={setIsModalOpen} />
                <Options setSearchName={setSearchPackName} />
                <TablePacks />
                <Pagination
                    page={page}
                    pageCount={pageCount}
                    totalCount={cardPacksTotalCount}
                    changePagination={changePagination}
                />
                <AddNewPackModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
                <ChatButton />
            </div>
        </div>
    )
}
