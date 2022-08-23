import React, {ReactElement} from 'react'

import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {useAppSelector} from '../../../../../common/hooks/useAppSelector'

export const SortIcon = ({name}: SortIconType): ReactElement => {
    const sortPacks = useAppSelector(state => state.packsList.queryParams.sortPacks)

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {/* eslint-disable-next-line no-nested-ternary */}
            {sortPacks[0] === '0' && sortPacks.slice(1) === name ? (
                <FontAwesomeIcon icon={faCaretDown} size="lg" />
            ) : sortPacks[0] === '1' && sortPacks.slice(1) === name ? (
                <FontAwesomeIcon icon={faCaretUp} size="lg" />
            ) : (
                ''
            )}
        </>
    )
}

// Types
type SortIconType = {
    name: string
}
