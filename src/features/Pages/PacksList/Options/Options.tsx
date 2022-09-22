import React, {ReactElement} from 'react'

import {Search} from '../../../../common/components/Search/Search'
import {useAppSelector} from '../../../../common/hooks/useAppSelector'

import {NumberOfCards} from './NumberOfCards/NumberOfCards'
import styles from './options.module.scss'
import {ShowPacksCards} from './ShowPacksCards/ShowPacksCards'

export const Options: React.FC<PropsType> = React.memo(
    ({setSearchName}): ReactElement => {
        const status = useAppSelector(state => state.app.status)

        return (
            <div className={styles.options}>
                <Search setSearchName={setSearchName} isDisabled={status === 'loading'} />
                <ShowPacksCards />
                <NumberOfCards />
            </div>
        )
    },
)

type PropsType = {
    setSearchName: (searchName: string) => void
}
