import React, {ReactElement, useState} from 'react';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import styles from './headerCardsList.module.scss'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Menu} from './Menu/Menu';
import {AddNewCardModal} from '../../../Modals/AddNewCardModal/AddNewCardModal';

export const HeaderPacksList = (): ReactElement => {

    const packUserId = useAppSelector(state => state.cardsList.packUserId)
    const userId = useAppSelector(state => state.profileReducer._id)
    const cardsPack_id = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)
    const packName = useAppSelector(state => state.cardsList.queryParams.packName)
    const cardsCount = useAppSelector(state => state.cardsList.queryParams.cardsCount)

    const [showMenu, setShowMenu] = useState<boolean>(false)

    const handleSetShowMenu = () => {
        setShowMenu(!showMenu)
    }

    const isMyCards = userId === packUserId

    return (
        <div className={styles.header}>
            <h2>
                {packName} {isMyCards &&
                <button className={styles.btnMenu} onClick={handleSetShowMenu}>
                    <FontAwesomeIcon className={styles.icon} icon={faEllipsisVertical} size="sm"/>
                </button>}
                {showMenu && <Menu/>}
            </h2>
            {isMyCards && !!cardsCount &&
                <AddNewCardModal cardsPackId={cardsPack_id}/>
            }
        </div>
    )
}