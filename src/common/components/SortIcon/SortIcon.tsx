import React, {ReactElement} from 'react'

import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import styles from './sortIcon.module.scss'

export const SortIcon = ({sortName, sortQueryName}: SortIconType): ReactElement => {
    return (
        <span className={styles.sortIcon}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {sortQueryName[0] === '0' && sortQueryName.slice(1) === sortName ? (
                <FontAwesomeIcon icon={faCaretDown} size="lg" />
            ) : sortQueryName[0] === '1' && sortQueryName.slice(1) === sortName ? (
                <FontAwesomeIcon icon={faCaretUp} size="lg" />
            ) : (
                ''
            )}
        </span>
    )
}

// Types
type SortIconType = {
    sortName: string
    sortQueryName: string
}
