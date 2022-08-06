import React, {ReactElement, useCallback} from "react";
import styles from "./cardsList.module.scss"
import {BackButton} from "../../../common/components/BackButton/BackButton";
import {TableCards} from "./TableCards/TableCards";
import {Pagination} from "../../../common/components/Pagination/Pagination";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {setCardsQueryParamsAC} from "./cardsListReducer";
import {HeaderPacksList} from "./HeaderCardsList/HeaderCardsList";
import {EmptyCardsList} from "./EmptyCardsList/EmptyCardsList";
import {Search} from "../../../common/components/Search/Search";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../common/components/RoutesList/RoutersList";

export const CardsList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const cardsTotalCount = useAppSelector(state => state.cardsList.cardsTotalCount)
    const cardsCount = useAppSelector(state => state.cardsList.cardsCount)
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)

    const changePagination = useCallback((page: number, pageCount: number): void => {
        dispatch(setCardsQueryParamsAC({page, pageCount}))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={PATH.Login}/>
    }

    return (
        <div className={styles.pack}>
            <div className={styles.container}>
                <BackButton/>
                <HeaderPacksList/>
                {!!cardsCount ? <div>
                        <Search listType={'cardsList'}/>
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