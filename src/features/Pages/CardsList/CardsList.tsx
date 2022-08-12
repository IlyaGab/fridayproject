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

    const cardsTotalCount = useAppSelector(state => state.cardsList.cardsTotalCount)
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)
    const stateCardsPackID = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)
    const statePackName = useAppSelector(state => state.cardsList.infoCardsPack.packName)

    const changePagination = useCallback((page: number, pageCount: number): void => {
        dispatch(setCardsQueryParamsAC({page, pageCount}))
    }, [dispatch])

    const [searchParams, setSearchParams] = useSearchParams()

    const cardsPack_id = searchParams.get("cardsPack_id") || stateCardsPackID
    const packName = searchParams.get("packName") || statePackName

    useEffect(() => {
        searchParams.set("cardsPack_id", cardsPack_id)
        searchParams.set("packName", packName)
        setSearchParams(searchParams)
        dispatch(setCardsQueryParamsAC({cardsPack_id}))
        dispatch(setInfoCardsPackAC({packName}))
        dispatch(getCardsListTC())
    }, [dispatch, cardsPack_id, packName])

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
                        <Pagination cardPacksTotalCount={cardsTotalCount}
                                    changePagination={changePagination}/>
                    </div>
                    : <EmptyCardsList/>
                }
            </div>
        </div>
    )
}