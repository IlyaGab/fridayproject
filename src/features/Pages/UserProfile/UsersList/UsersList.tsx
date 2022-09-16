import React, {ReactElement, useCallback, useEffect} from 'react'

import {useSearchParams} from 'react-router-dom'

import {BackButton} from '../../../../common/components/BackButton/BackButton'
import {Pagination} from '../../../../common/components/Pagination/Pagination'
import {PATH} from '../../../../common/components/RoutesList/RoutersList'
import {Search} from '../../../../common/components/Search/Search'
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../../common/hooks/useAppSelector'

import {TableUsers} from './TableUsers/TableUsers'
import styles from './usersList.module.scss'
import {getUsersListTC, setUsersListQueryParamsAC} from './usersListReducer'

export const UsersList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const pageState = useAppSelector(state => state.usersList.page)
    const pageCountState = useAppSelector(state => state.usersList.pageCount)
    const usersTotalCount = useAppSelector(state => state.usersList.usersTotalCount)
    const sortUsers = useAppSelector(state => state.usersList.queryParams.sortUsers)
    const searchUserName = useAppSelector(state => state.usersList.queryParams.userName)

    const [searchParams] = useSearchParams()

    const page = Number(searchParams.get('page')) || pageState
    const pageCount = Number(searchParams.get('pageCount')) || pageCountState

    useEffect(() => {
        dispatch(getUsersListTC())
    }, [dispatch, page, pageCount, sortUsers, searchUserName])

    const changePagination = useCallback(
        (page: number, pageCount: number): void => {
            dispatch(setUsersListQueryParamsAC({page, pageCount}))
        },
        [dispatch],
    )

    const setSearchUserName = useCallback(
        (searchName: string): void => {
            dispatch(setUsersListQueryParamsAC({userName: searchName}))
        },
        [dispatch],
    )

    return (
        <div className={styles.usersList}>
            <div className={styles.container}>
                <BackButton path={PATH.PacksList} title="Back to Packs List" />
                <Search setSearchName={setSearchUserName} />
                <TableUsers />
                <Pagination
                    page={page}
                    pageCount={pageCount}
                    totalCount={usersTotalCount}
                    changePagination={changePagination}
                />
            </div>
        </div>
    )
}
