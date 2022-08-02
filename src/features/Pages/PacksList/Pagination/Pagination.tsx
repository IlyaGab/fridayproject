import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./pagination.module.scss";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {getPackListTC, setPageNumberCountAC} from '../packsListReducer';

const arr = [5, 10, 20, 50]

export const Pagination = () => {
    const dispatch = useAppDispatch()

    const cardPacksTotalCount = useAppSelector(state => state.packsList.cardPacksTotalCount)

    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(arr[0])
    const [startPage, setStartPage] = useState<number>(1)
    const [finishPage, setFinishPage] = useState<number>(5)

    const numberOfPages = Math.ceil(cardPacksTotalCount / pageSize)

    const pages = [];
    for (let i = startPage; i <= finishPage; i++) {
        pages.push(i)
    }
    const onClickPageHandler = (el: number): void => {
        setPage(el)
    }

    const onChangeSizePageHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
        setPageSize(Number(e.currentTarget.value))
    }

    const onClickBackHandler = (): void => {
        if(startPage - 5 < 1) {
            setStartPage(1)
            setFinishPage(5)
        } else {
            setStartPage(startPage - 5)
            setFinishPage(finishPage - 5)
        }
    }

    const onClickForthHandler = (): void => {
        if(finishPage + 5 > numberOfPages) {
            setStartPage(numberOfPages - 5)
            setFinishPage(numberOfPages - 1)
        } else {
            setStartPage(startPage + 5)
            setFinishPage(finishPage + 5)
        }
    }

    let ellipsis = "..."
    if(finishPage === numberOfPages - 1) {
        ellipsis = ""
    }

    useEffect(() => {
        dispatch(setPageNumberCountAC(page, pageSize))
        dispatch(getPackListTC())
    }, [dispatch, page, pageSize])

    return (
        <div className={styles.pagination}>
            <button className={styles.btn} onClick={onClickBackHandler}><FontAwesomeIcon className={styles.icon}
                                                                                         icon={faAngleLeft} size="lg"/>
            </button>

            {pages.map(el => <span key={el}
                                   className={page === el ? `${styles.pageButton} ${styles.activePageButton}` : `${styles.pageButton}`}
                                   onClick={() => onClickPageHandler(el)}>{el}</span>)}
            {}
            <span>{ellipsis}</span>
            <span key={numberOfPages}
                  className={page === numberOfPages ? `${styles.pageButton} ${styles.activePageButton}` : `${styles.pageButton}`}
                  onClick={() => onClickPageHandler(numberOfPages)}>{numberOfPages}</span>
            <button className={styles.btn} onClick={onClickForthHandler}><FontAwesomeIcon className={styles.icon}
                                                                                          icon={faAngleRight} size="lg"/>
            </button>
            Show
            <select onChange={onChangeSizePageHandler}>
                {arr.map(el => <option key={el} value={el}>{el}</option>)}
            </select>
            Cards per Page
        </div>
    )
}