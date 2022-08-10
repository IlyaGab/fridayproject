import React, {ReactElement} from "react";
import styles from "./packsActionButtons.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGraduationCap} from "@fortawesome/free-solid-svg-icons";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";
import {PackType} from "../../../../../api/packsAPI";
import {DeletePackModal} from "../../../../Modals/DeletePackModal/DeletePackModal";
import {EditPackModal} from "../../../../Modals/EditPackModal/EditPackModal";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../../../common/components/RoutesList/RoutersList";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {getCardsListTC, setCardsQueryParamsAC} from "../../../CardsList/cardsListReducer";

export const PacksActionButtons = ({row}: ActionButtonsType): ReactElement => {
    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.profileReducer._id)

    const navigate = useNavigate()

    const navigateToLearnHandler = (): void => {
        navigate(PATH.Learn)
        dispatch(setCardsQueryParamsAC({cardsPack_id: row._id}))
        dispatch(getCardsListTC())
    }

    return (
        <div>
            <DeletePackModal userId={userId} row={row}/>
            <EditPackModal userId={userId} row={row}/>
            <button className={styles.btn}
                    onClick={navigateToLearnHandler}
                    disabled={row.cardsCount === 0}
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