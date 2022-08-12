import React, {
    ChangeEvent,
    ReactElement,
    useEffect,
} from "react";
import styles from "./pagination.module.scss";
import {Pagination as PaginationMUI} from "@mui/material";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useSearchParams} from 'react-router-dom';

const arr = [5, 10, 20, 50]

export const Pagination = React.memo(({
                                          cardPacksTotalCount,
                                          changePagination
                                      }: PaginationType): ReactElement => {

    const [searchParams, setSearchParams] = useSearchParams()

    const statePage = useAppSelector(state => state.packsList.queryParams.page)
    const statePageCount = useAppSelector(state => state.packsList.queryParams.pageCount)

    const page = Number(searchParams.get('page')) || statePage
    const pageCount = Number(searchParams.get('pageCount')) || statePageCount

    let numberOfPages = Math.ceil(cardPacksTotalCount / pageCount)

    const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        searchParams.set('page', `${page}`)
        setSearchParams(searchParams)
    }

    const onChangeSizePageHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
        searchParams.set('pageCount', `${Number(e.currentTarget.value)}`)
        setSearchParams(searchParams)
    }

    useEffect(() => {
        changePagination(page,pageCount)
    }, [changePagination, page, pageCount])

    return (
        <div className={styles.pagination}>
            <PaginationMUI page={page} count={numberOfPages} color="primary" style={{display: "inline-block"}}
                           onChange={onChangePage}/>
            Show
            <select onChange={onChangeSizePageHandler} value={pageCount}>
                {arr.map(el => <option key={el} value={el}>{el}</option>)}
            </select>
            Cards per Page
        </div>
    )
})

//Types
type PaginationType = {
    cardPacksTotalCount: number
    changePagination: (age: number, pageCount: number) => void
}
