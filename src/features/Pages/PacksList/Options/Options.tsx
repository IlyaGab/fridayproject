import React, {ReactElement} from 'react'

import {Search} from '../../../../common/components/Search/Search'

import {NumberOfCards} from './NumberOfCards/NumberOfCards'
import styles from './options.module.scss'
import {ShowPacksCards} from './ShowPacksCards/ShowPacksCards'

export const Options: React.FC<PropsType> = ({setSearchPackName}): ReactElement => {
    return (
        <div className={styles.options}>
            <Search setSearchPackName={setSearchPackName} />
            <ShowPacksCards />
            <NumberOfCards />
        </div>
    )
}

type PropsType = {
    setSearchPackName: (searchName: string) => void
}
