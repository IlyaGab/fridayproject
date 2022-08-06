import React, {
    ChangeEvent,
    ReactElement,
    useEffect,
    useState
} from "react";
import styles from "./pagination.module.scss";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const arr = [5, 10, 20, 50]

export const Pagination = React.memo(({
                               cardPacksTotalCount,
                               changePagination
                           }: PaginationType): ReactElement => {

    const [page, setPage] = useState<number>(1)
    const [pageCount, setPageCount] = useState<number>(5)
    const [startPage, setStartPage] = useState<number>(1)
    const [finishPage, setFinishPage] = useState<number>(5)

    let numberOfPages = Math.ceil(cardPacksTotalCount / pageCount)

    const pages = [];
    if (finishPage === numberOfPages || page === numberOfPages) {
        for (let i = numberOfPages - 6 >= 1 ? numberOfPages - 6 : 1; i <= numberOfPages; i++) {
            pages.push(i)
        }
    } else {
        for (let i = startPage; i <= finishPage && i <= numberOfPages; i++) {
            pages.push(i)
        }
    }

    const onClickPageHandler = (el: number): void => {
        setPage(el)
    }

    const onChangeSizePageHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
        setPageCount(Number(e.currentTarget.value))
    }

    const onClickBackHandler = (): void => {
        if (startPage - 5 < 1) {
            setStartPage(1)
            setFinishPage(5)
            setPage(1)
        } else {
            setStartPage(startPage - 5)
            setFinishPage(finishPage - 5)
            setPage(page - 5)
        }
    }

    const onClickForthHandler = (): void => {
        if (finishPage + 5 > numberOfPages) {
            setStartPage(numberOfPages - 5)
            setFinishPage(numberOfPages)
            setPage(numberOfPages)
        } else {
            setStartPage(startPage + 5)
            setFinishPage(finishPage + 5)
            setPage(page + 5)
        }
    }

    let ellipsis = "..."
    if (finishPage === numberOfPages - 1) {
        ellipsis = ""
    }

    useEffect(() => {
        changePagination(page, pageCount)
    }, [changePagination, page, pageCount])

    return (
        <div className={styles.pagination}>
            <button className={styles.btn} onClick={onClickBackHandler}><FontAwesomeIcon
                className={styles.icon}
                icon={faAngleLeft} size="lg"/>
            </button>

            {pages.map(el => <span key={el}
                                   className={page === el ? `${styles.pageButton} ${styles.activePageButton}` : `${styles.pageButton}`}
                                   onClick={() => onClickPageHandler(el)}>{el}</span>)}
            {numberOfPages > finishPage && page !== numberOfPages && <span>
                <span style={{margin: "0 10px"}}>{ellipsis}</span>
                <span key={numberOfPages}
                      className={page === numberOfPages ? `${styles.pageButton} ${styles.activePageButton}` : `${styles.pageButton}`}
                      onClick={() => onClickPageHandler(numberOfPages)}>{numberOfPages}</span>
                 </span>
            }
            <button className={styles.btn} onClick={onClickForthHandler}><FontAwesomeIcon
                className={styles.icon}
                icon={faAngleRight} size="lg"/>
            </button>
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
