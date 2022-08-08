import React, {ReactElement} from "react";
import styles from "./packsActionButtons.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGraduationCap} from "@fortawesome/free-solid-svg-icons";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";
import {PackType} from "../../../../../api/packsAPI";
import {DeletePackModal} from "../../../../Modals/DeletePackModal/DeletePackModal";
import {EditPackModal} from "../../../../Modals/EditPackModal/EditPackModal";


export const PacksActionButtons = ({row}: ActionButtonsType): ReactElement => {
    const userId = useAppSelector(state => state.profileReducer._id)

    return (
        <div>
            <DeletePackModal userId={userId} row={row}/>
            <EditPackModal userId={userId} row={row}/>
            <button className={styles.btn}
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