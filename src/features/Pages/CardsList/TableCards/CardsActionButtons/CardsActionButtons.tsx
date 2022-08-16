import React, {ReactElement} from "react";
import {CardType} from "../../../../../api/cardsAPI";

export const CardsActionButtons = ({row}: ActionButtonsType): ReactElement => {

    return (
        <div>
            {/*<DeleteCardModal row={row}/>*/}
            {/*<EditCardModal row={row}/>*/}

        </div>
    )
}

//Types
type ActionButtonsType = {
    row: CardType
}