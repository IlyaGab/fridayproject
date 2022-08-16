import React, {ReactElement, useState} from "react";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import styles from "./headerCardsList.module.scss"
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Menu} from "./Menu/Menu";
import {useSearchParams} from "react-router-dom";

export const HeaderPacksList = (): ReactElement => {
    const cardsPack_id = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)
    const cardsTotalCount = useAppSelector(state => state.cardsList.cardsTotalCount)
    const isMyCards = useAppSelector(state => state.cardsList.infoCardsPack.isMyCards)

    const [showMenu, setShowMenu] = useState<boolean>(false)

    const [searchParams] = useSearchParams()
    const packName = searchParams.get("packName")

    const onClickSetShowMenu = () => {
        setShowMenu(!showMenu)
    }
    const onBlurSetShowMenu = () => {
        setTimeout(() =>{
            setShowMenu(false)
        }, 200)
    }

    return (
        <div className={styles.header}>
            <h2>
                {packName} {isMyCards &&
                <button className={styles.btnMenu} onClick={onClickSetShowMenu} onBlur={onBlurSetShowMenu}>
                    <FontAwesomeIcon className={styles.icon} icon={faEllipsisVertical} size="sm"/>
                </button>}
                {showMenu && <Menu/>}
            </h2>
            {/*{isMyCards && !!cardsTotalCount &&
                <AddNewCardModal cardsPackId={cardsPack_id}/>
            }*/}
        </div>
    )
}