import React, {ReactElement} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";

export const SortIcon = ({name}: SortIconType): ReactElement => {
    const sortPacks = useAppSelector(state => state.packsList.queryParams.sortPacks)
    const sortPacksName = useAppSelector(state => state.packsList.queryParams.sortPacksName)
    return (
        <>
            {sortPacks === 0 && sortPacksName === name
                ? <FontAwesomeIcon icon={faCaretDown} size="lg"/>
                : sortPacksName === name
                    ? <FontAwesomeIcon icon={faCaretUp} size="lg"/>
                    : ""
            }

        </>

    )
}

//Types
type SortIconType = {
    name: string
}