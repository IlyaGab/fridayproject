import React, {ReactElement} from "react";
import styles from "./menu.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {deleteCardsPackTC} from "../../../PacksList/packsListReducer";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../../../common/components/RoutesList/RoutersList";

export const Menu = (): ReactElement => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const cardsPack_id = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)

    const deleteCardsPack = (): void => {
        dispatch(deleteCardsPackTC(cardsPack_id))
        navigate(PATH.PacksList)
    }

    return (
        <div className={styles.menu}>
            <div className={styles.menuContainer}>
                <button
                    className={styles.btn}
                ><FontAwesomeIcon
                    className={styles.icon}
                    icon={faTrashCan} size="lg"
                />
                    Edit
                </button>
                <button
                    onClick={deleteCardsPack}
                    className={styles.btn}
                ><FontAwesomeIcon
                    className={styles.icon}
                    icon={faPencil} size="lg"/>
                    Delete
                </button>
            </div>
        </div>
    )
}