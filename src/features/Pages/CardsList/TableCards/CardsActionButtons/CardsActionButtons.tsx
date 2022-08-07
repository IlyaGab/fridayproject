import React, {ReactElement} from "react";
import styles from "./cardsActionButtons.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {CardType} from "../../../../../api/cardsAPI";
import {changeCardTC, deleteCardTC} from "../../cardsListReducer";

export const CardsActionButtons = ({row}: ActionButtonsType): ReactElement => {
    const dispatch = useAppDispatch()

    const deleteCardHandler = (id: string) => (): void => {
        dispatch(deleteCardTC(id))
    }

    const changeCardHandler = (_id: string) => (): void => {
        dispatch(changeCardTC({_id, question: "new question"}))
    }

    return (
        <div>
            <button onClick={deleteCardHandler(row._id)}
                    className={styles.btn}
            ><FontAwesomeIcon
                className={styles.icon}
                icon={faTrashCan} size="lg"
            />
            </button>
            <button
                onClick={changeCardHandler(row._id)}
                className={styles.btn}
            ><FontAwesomeIcon
                className={styles.icon}
                icon={faPencil} size="lg"/>
            </button>
        </div>
    )
}

//Types
type ActionButtonsType = {
    row: CardType
}