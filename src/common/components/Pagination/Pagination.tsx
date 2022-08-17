import React, {ChangeEvent, ReactElement, useEffect,} from "react";
import styles from "./pagination.module.scss";
import {Pagination as PaginationMUI} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";

const arr = [5, 10, 20, 50]

export const Pagination = React.memo(({
                                          page,
                                          pageCount,
                                          cardPacksTotalCount,
                                          changePagination
                                      }: PaginationType): ReactElement => {

    const status = useAppSelector(state => state.appReducer.status)

    const [searchParams, setSearchParams] = useSearchParams()

    let numberOfPages = Math.ceil(cardPacksTotalCount / pageCount)

    const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        searchParams.set("page", `${page}`)
        setSearchParams(searchParams)
    }

    const onChangeSizePageHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
        searchParams.set("pageCount", `${Number(e.currentTarget.value)}`)
        setSearchParams(searchParams)
    }

    useEffect(() => {
        changePagination(page, pageCount)
    }, [changePagination, page, pageCount])

    return (
        <div className={styles.pagination}>
            <PaginationMUI page={page} count={numberOfPages} color="primary"
                           style={{display: "inline-block"}}
                           disabled={status === "loading"}
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
    page: number
    pageCount: number
    cardPacksTotalCount: number
    changePagination: (age: number, pageCount: number) => void
}
