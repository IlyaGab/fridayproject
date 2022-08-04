import React, {ReactElement, useCallback} from 'react';
import styles from './cardsList.module.scss'
import {BackButton} from '../../../common/components/BackButton/BackButton';
import {TableCards} from './TableCards/TableCards';
import {Pagination} from '../../../common/components/Pagination/Pagination';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {getCardsListTC, setCardsQueryParamsAC} from './cardsListReducer';
import {HeaderPacksList} from './HeaderCardsList/HeaderCardsList';
import {EmptyCardsList} from './EmptyCardsList/EmptyCardsList';
import {Search} from '../../../common/components/Search/Search';

export const CardsList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const cardsTotalCount = useAppSelector(state => state.cardsList.cardsTotalCount)
    const cardsCount = useAppSelector(state => state.cardsList.queryParams.cardsCount)

    const changePagination = useCallback((page: number, pageCount: number): void => {
        dispatch(setCardsQueryParamsAC({page, pageCount}))
        dispatch(getCardsListTC())
    }, [dispatch])

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