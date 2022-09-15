import React, {ReactElement, useCallback, useEffect, useState} from 'react'

import {Navigate, useSearchParams} from 'react-router-dom'

import {BackButton} from '../../../common/components/BackButton/BackButton'
import {Pagination} from '../../../common/components/Pagination/Pagination'
import {PATH} from '../../../common/components/RoutesList/RoutersList'
import {Search} from '../../../common/components/Search/Search'
import {useAppDispatch} from '../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../common/hooks/useAppSelector'
import {AddNewCardModal} from '../../Modals/CardsModals/AddNewCardModal'

import styles from './cardsList.module.scss'
import {getCardsListTC, setCardsQueryParamsAC} from './cardsListReducer'
import {EmptyCardsList} from './EmptyCardsList/EmptyCardsList'
import {HeaderCardsList} from './HeaderCardsList/HeaderCardsList'
import {TableCards} from './TableCards/TableCards'

export const CardsList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const cardsTotalCount = useAppSelector(state => state.cardsList.cardsTotalCount)
    const cardsCount = useAppSelector(state => state.cardsList.infoCardsPack.cardsCount)
    const stateCardsPackID = useAppSelector(
        state => state.cardsList.queryParams.cardsPack_id,
    )
    const statePackName = useAppSelector(state => state.cardsList.infoCardsPack.packName)
    const statePage = useAppSelector(state => state.cardsList.queryParams.page)
    const statePageCount = useAppSelector(state => state.cardsList.queryParams.pageCount)
    const cardQuestion = useAppSelector(state => state.cardsList.queryParams.cardQuestion)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()

    const cardsPack_id = searchParams.get('cardsPack_id') || stateCardsPackID
    const packName = searchParams.get('packName') || statePackName
    const page = Number(searchParams.get('page')) || statePage
    const pageCount = Number(searchParams.get('pageCount')) || statePageCount

    const changePagination = useCallback(
        (page: number, pageCount: number): void => {
            dispatch(setCardsQueryParamsAC({page, pageCount}))
        },
        [dispatch],
    )

    const setSearchPackName = useCallback(
        (searchName: string): void => {
            dispatch(setCardsQueryParamsAC({cardQuestion: searchName}))
        },
        [dispatch],
    )

    useEffect(() => {
        searchParams.set('cardsPack_id', cardsPack_id)
        searchParams.set('packName', packName)
        setSearchParams(searchParams)
    }, [cardsPack_id, packName, searchParams, setSearchParams])

    useEffect(() => {
        dispatch(getCardsListTC())
    }, [dispatch, page, pageCount, cardQuestion])

    if (!isLoggedIn) {
        return <Navigate to={PATH.Login} />
    }

    return (
        <div className={styles.pack}>
            <div className={styles.container}>
                <BackButton />
                <HeaderCardsList setIsModalOpen={setIsModalOpen} />
                {cardsCount ? (
                    <div>
                        <Search setSearchName={setSearchPackName} />
                        <TableCards />
                        <Pagination
                            page={page}
                            pageCount={pageCount}
                            cardPacksTotalCount={cardsTotalCount}
                            changePagination={changePagination}
                        />
                    </div>
                ) : (
                    <EmptyCardsList setIsModalOpen={setIsModalOpen} />
                )}
                <AddNewCardModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>
        </div>
    )
}
