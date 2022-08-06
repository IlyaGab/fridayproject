import React, {ReactElement, useState} from "react";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {AddButton} from "../../../../common/components/AddButton/AddButton";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {createCardTC} from "../cardsListReducer";
import styles from "./headerCardsList.module.scss"
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Menu} from "./Menu/Menu";

export const HeaderPacksList = (): ReactElement => {
    const dispatch = useAppDispatch()

    const packUserId = useAppSelector(state => state.cardsList.packUserId)
    const userId = useAppSelector(state => state.profileReducer._id)
    const cardsPack_id = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)
    const packName = useAppSelector(state => state.cardsList.packName)
    const cardsCount = useAppSelector(state => state.cardsList.cardsCount)

    const [showMenu, setShowMenu] = useState<boolean>(false)

    const handleAddNewCard = () => {
        dispatch(createCardTC({cardsPack_id}))
    }

    const handleSetShowMenu = () => {
        setShowMenu(!showMenu)
    }

    const isMyCards = userId === packUserId

    return (
        <div className={styles.header}>
            <h2>
                {packName} {isMyCards &&
                <button className={styles.btnMenu} onClick={handleSetShowMenu} >
                    <FontAwesomeIcon className={styles.icon} icon={faEllipsisVertical} size="sm"/>
                </button>}
                {showMenu && <Menu/>}
            </h2>
            {isMyCards && !!cardsCount &&
                <AddButton name={"Add new card"} callback={handleAddNewCard}/>}
        </div>
    )
}