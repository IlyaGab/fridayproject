import React, {ReactElement} from "react";
import styles from "../tablePacks.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGraduationCap, faPencil, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {changeNameCardsPackTC, deleteCardsPackTC} from "../../packsListReducer";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";
import {PackType} from "../../../../../api/packsAPI";


export const ActionButtons = ({row}: ActionButtonsType): ReactElement => {
    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.profileReducer._id)

    const deleteCardsPackHandler = (id: string) => (): void => {
        dispatch(deleteCardsPackTC(id))
    }

    const changeNameCardsPackHandler = (id: string, name: string) => (): void => {
        dispatch(changeNameCardsPackTC(id, name))
    }

    return (
        <div>
            <button onClick={deleteCardsPackHandler(row._id)}
                    className={styles.btn}
                    disabled={userId !== row.user_id}
            ><FontAwesomeIcon
                className={styles.icon}
                icon={faTrashCan} size="lg"
            />
            </button>
            <button
                onClick={changeNameCardsPackHandler(row._id, "New name")}
                className={styles.btn}
                disabled={userId !== row.user_id}
            ><FontAwesomeIcon
                className={styles.icon}
                icon={faPencil} size="lg"/>
            </button>
            <button className={styles.btn}
                    disabled={userId !== row.user_id}
            ><FontAwesomeIcon
                className={styles.icon}
                icon={faGraduationCap} size="lg"/>
            </button>
        </div>
    )
}

//Types

type ActionButtonsType = {
    row: PackType
}