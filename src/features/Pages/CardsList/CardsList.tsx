import React, {ReactElement} from "react";
import styles from "./cardsList.module.scss"
import {BackButton} from "../../../common/components/BackButton/BackButton";
import {TableCards} from "./TableCards/TableCards";
import {Pagination} from "../../../common/components/Pagination/Pagination";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {getCardsListTC, setCardsQueryParamsAC} from "./cardsListReducer";

export const CardsList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const cardsTotalCount = useAppSelector(state => state.cardsList.cardsTotalCount)
    const packName = useAppSelector(state => state.cardsList.queryParams.packName)
    const cards = useAppSelector(state => state.cardsList.cards)

    const changePagination = (page: number, pageCount: number) => {
        dispatch(setCardsQueryParamsAC({page, pageCount}))
        dispatch(getCardsListTC())
    }

    return (
        <div className={styles.pack}>
            <div className={styles.container}>
                <BackButton/>
                <h2>
                    {packName}
                </h2>
                {!!cards.length ? <div>
                        <TableCards/>
                        <Pagination cardPacksTotalCount={cardsTotalCount}
                                    changePagination={changePagination}/>
                    </div>
                    : <div style={{textAlign: "center", marginTop: "150px"}}>
                        <p>This pack is empty. Click add new card to fill this pack</p>
                        <button>Add new card</button>
                    </div>
                }
            </div>
        </div>
    )
}