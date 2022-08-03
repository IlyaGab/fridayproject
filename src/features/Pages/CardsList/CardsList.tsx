import React, {ReactElement} from "react";
import styles from "./cardsList.module.scss"
import {BackButton} from "../../../common/components/BackButton/BackButton";
import {TableCards} from "./TableCards/TableCards";
import {Pagination} from "../../../common/components/Pagination/Pagination";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {getCardsListTC, setCardsQueryParamsAC} from "./cardsListReducer";
import {HeaderPacksList} from "./HeaderCardsList/HeaderCardsList";
import {EmptyCardsList} from "./EmptyCardsList/EmptyCardsList";

export const CardsList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const cardsTotalCount = useAppSelector(state => state.cardsList.cardsTotalCount)
    const cards = useAppSelector(state => state.cardsList.cards)

    const changePagination = (page: number, pageCount: number): void => {
        dispatch(setCardsQueryParamsAC({page, pageCount}))
        dispatch(getCardsListTC())
    }

    return (
        <div className={styles.pack}>
            <div className={styles.container}>
                <BackButton/>
                <HeaderPacksList />
                {!!cards.length ? <div>
                        <TableCards/>
                        <Pagination cardPacksTotalCount={cardsTotalCount}
                                    changePagination={changePagination}/>
                    </div>
                    : <EmptyCardsList />
                }
            </div>
        </div>
    )
}