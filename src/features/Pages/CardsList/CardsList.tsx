import React, {ReactElement, useCallback, useEffect} from 'react';
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
import {Navigate, useParams} from 'react-router-dom';
import {PATH} from "../../../common/components/RoutesList/RoutersList";

export const CardsList = (): ReactElement => {
    const dispatch = useAppDispatch()


    const cardsTotalCount = useAppSelector(state => state.cardsList.cardsTotalCount)
    const cardsCount = useAppSelector(state => state.cardsList.infoCardsPack.cardsCount)
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)

    const changePagination = useCallback((page: number, pageCount: number): void => {
        dispatch(setCardsQueryParamsAC({page, pageCount}))
    }, [dispatch])

    const {cardsPack_id} = useParams()
    console.log(cardsPack_id)

    useEffect(()=> {
        if(cardsPack_id) {
            dispatch(setCardsQueryParamsAC({cardsPack_id}))
        }
    },[dispatch, cardsPack_id])

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