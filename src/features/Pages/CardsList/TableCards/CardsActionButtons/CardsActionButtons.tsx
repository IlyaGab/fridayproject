import React, {ReactElement} from "react";
import {CardType} from "../../../../../api/cardsAPI";
import {DeleteCardModal} from '../../../../Modals/DeleteCardModal/DeleteCardModal';
import {EditCardModal} from '../../../../Modals/EditCardModal/EditCardModal';

export const CardsActionButtons = ({row}: ActionButtonsType): ReactElement => {

    return (
        <div>
            <DeleteCardModal row={row}/>
            <EditCardModal row={row}/>
        </div>
    )
}

//Types
type ActionButtonsType = {
    row: CardType
}