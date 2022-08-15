import React, {ReactElement, useCallback, useEffect} from "react";
import styles from "./cardsList.module.scss"
import {BackButton} from "../../../common/components/BackButton/BackButton";
import {TableCards} from "./TableCards/TableCards";
import {Pagination} from "../../../common/components/Pagination/Pagination";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {getCardsListTC, setCardsQueryParamsAC, setInfoCardsPackAC} from "./cardsListReducer";
import {HeaderPacksList} from "./HeaderCardsList/HeaderCardsList";
import {EmptyCardsList} from "./EmptyCardsList/EmptyCardsList";
import {Search} from "../../../common/components/Search/Search";
import {Navigate, useSearchParams} from "react-router-dom";
import {PATH} from "../../../common/components/RoutesList/RoutersList";

export const CardsList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)
    const cardsTotalCount = useAppSelector(state => state.cardsList.cardsTotalCount)
    const stateCardsPackID = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)
    const statePackName = useAppSelector(state => state.cardsList.infoCardsPack.packName)
    const statePage = useAppSelector(state => state.cardsList.queryParams.page)
    const statePageCount = useAppSelector(state => state.cardsList.queryParams.pageCount)

    const changePagination = useCallback((page: number, pageCount: number): void => {
        dispatch(setCardsQueryParamsAC({page, pageCount}))
    }, [dispatch])

    const [searchParams, setSearchParams] = useSearchParams()

    const cardsPack_id = searchParams.get("cardsPack_id") || stateCardsPackID
    const packName = searchParams.get("packName") || statePackName
    const page = Number(searchParams.get("page")) || statePage
    const pageCount = Number(searchParams.get("pageCount")) || statePageCount

    useEffect(() => {
        searchParams.set("cardsPack_id", cardsPack_id)
        searchParams.set("packName", packName)
        searchParams.set("page", String(page))
        searchParams.set("pageCount", String(pageCount))
        setSearchParams(searchParams)
        dispatch(setCardsQueryParamsAC({cardsPack_id}))
        dispatch(setInfoCardsPackAC({packName}))
        dispatch(getCardsListTC())
    }, [dispatch, cardsPack_id, packName, page, pageCount])

    if (!isLoggedIn) {
        return <Navigate to={PATH.Login}/>
    }

    return (
        <div className={styles.pack}>
            <div className={styles.container}>
                <BackButton/>
                <HeaderPacksList/>
                {!!cardsTotalCount ? <div>
                        <Search listType={"cardsList"}/>
                        <TableCards/>
                        <Pagination page={page} pageCount={pageCount} cardPacksTotalCount={cardsTotalCount}
                                    changePagination={changePagination}/>
                    </div>
                    : <EmptyCardsList/>
                }
            </div>
        </div>
    )
}