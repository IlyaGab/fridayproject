import React, {
    ChangeEvent,
    ReactElement,
    useEffect,
    useState
} from "react";
import styles from "./pagination.module.scss";
import {Pagination as PaginationMUI} from "@mui/material";
import {useAppSelector} from "../../hooks/useAppSelector";

const arr = [5, 10, 20, 50]

export const Pagination = React.memo(({
                                          cardPacksTotalCount,
                                          changePagination
                                      }: PaginationType): ReactElement => {

    const statePageCount = useAppSelector(state => state.packsList.queryParams.pageCount)
    const [localPage, setLocalPage] = useState<number>(1)
    const [pageCount, setPageCount] = useState<number>(statePageCount)

    let numberOfPages = Math.ceil(cardPacksTotalCount / pageCount)

    const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setLocalPage(page)
    }

    const onChangeSizePageHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
        setPageCount(Number(e.currentTarget.value))
    }

    useEffect(() => {
        changePagination(localPage, pageCount)
    }, [changePagination, localPage, pageCount])

    return (
        <div className={styles.pagination}>
            <PaginationMUI count={numberOfPages} color="primary" style={{display: "inline-block"}}
                           onChange={onChangePage}/>
            Show
            <select onChange={onChangeSizePageHandler}>
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
