import React, {ReactElement} from 'react'

import {Search} from '../../../../common/components/Search/Search'

import {NumberOfCards} from './NumberOfCards/NumberOfCards'
import styles from './options.module.scss'
import {ShowPacksCards} from './ShowPacksCards/ShowPacksCards'

export const Options: React.FC<PropsType> = React.memo(
    ({setSearchName}): ReactElement => {
        return (
            <div className={styles.options}>
                <Search setSearchName={setSearchName} />
                <ShowPacksCards />
                <NumberOfCards />
            </div>
        )
    },
)

type PropsType = {
    setSearchName: (searchName: string) => void
}
