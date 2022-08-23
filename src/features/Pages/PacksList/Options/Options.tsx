import React, {ReactElement} from 'react'

import {Search} from '../../../../common/components/Search/Search'
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch'
import {setQueryParamsAC} from '../packsListReducer'

import {NumberOfCards} from './NumberOfCards/NumberOfCards'
import styles from './options.module.scss'
import {ShowPacksCards} from './ShowPacksCards/ShowPacksCards'

export const Options = (): ReactElement => {
    const dispatch = useAppDispatch()

    const setSearchPackName = (searchName: string): void => {
        dispatch(setQueryParamsAC({packName: searchName}))
    }

    return (
        <div className={styles.options}>
            <Search setSearchPackName={setSearchPackName} />
            <ShowPacksCards />
            <NumberOfCards />
        </div>
    )
}
