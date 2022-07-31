import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./pagination.module.scss";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {getPackListTC} from "../packsListReducer";

const arr = [5, 10, 20, 50]

export const Pagination = () => {
    const dispatch = useAppDispatch()
    const cardPacksTotalCount = useAppSelector(state => state.packsList.cardPacksTotalCount)

    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(arr[0])

    const numberOfPages = Math.ceil(cardPacksTotalCount / pageSize)

    let pages = [];
    for (let i = 1; i <= 5; i++) {
        pages.push(i)
    }
    const onClickHandler = (el: number) => {
        setPage(el)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        debugger
        setPageSize(Number(e.currentTarget.value))
    }

    useEffect(() => {
        dispatch(getPackListTC(`?page=${page}&pageCount=${pageSize}&sortPacks=0updated`))
    }, [page, pageSize])

    return (
        <div className={styles.pagination}>
            <div>
                <FontAwesomeIcon className={styles.icon} icon={faAngleLeft} size="lg"/>
                {pages.map(el => <span key={el} className={styles.pageButton}
                                       onClick={() => onClickHandler(el)}>{el}</span>)}
                ...
                {numberOfPages}
                <FontAwesomeIcon className={styles.icon} icon={faAngleRight} size="lg"/>
                Show
                <select onChange={onChangeHandler}>
                    {arr.map(el => <option key={el} value={el}>{el}</option>)}
                </select>
                Cards per Page
            </div>
        </div>
    )
}