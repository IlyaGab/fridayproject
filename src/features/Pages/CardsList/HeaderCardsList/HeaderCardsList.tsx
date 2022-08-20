import React, {ReactElement, useState} from 'react';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import styles from './headerCardsList.module.scss'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Menu} from './Menu/Menu';
import {useSearchParams} from 'react-router-dom';
import {AddButton} from '../../../../common/components/AddButton/AddButton';

export const HeaderCardsList: React.FC<PropsType> = ({setIsModalOpen}): ReactElement => {
    const cardsTotalCount = useAppSelector(state => state.cardsList.cardsTotalCount)
    const isMyCards = useAppSelector(state => state.cardsList.infoCardsPack.isMyCards)
    const status = useAppSelector(state => state.appReducer.status)
    const deckCover = useAppSelector(state => state.cardsList.infoCardsPack.deckCover)

    const [showMenu, setShowMenu] = useState<boolean>(false)

    const [searchParams] = useSearchParams()
    const packName = searchParams.get('packName')

    const handleAddNewCard = () => {
        setIsModalOpen(true)
    }
    const onClickSetShowMenu = () => {
        setShowMenu(!showMenu)
    }
    const onBlurSetShowMenu = () => {
        setTimeout(() => {
            setShowMenu(false)
        }, 200)
    }

    return (
        <div className={styles.header}>
            <h2>
                {/*<img src={deckCover || noCover} alt="deckCover" style={{width: '75px', height: '40px'}}/>*/}
                {packName} {isMyCards &&
                <button className={styles.btnMenu} onClick={onClickSetShowMenu} onBlur={onBlurSetShowMenu}>
                    <FontAwesomeIcon className={styles.icon} icon={faEllipsisVertical} size="sm"/>
                </button>}
                {showMenu && <Menu/>}
            </h2>
            {isMyCards && !!cardsTotalCount &&
                <AddButton name={'Add new card'} callback={handleAddNewCard} disabled={status === 'loading'}/>}
        </div>
    )
}

type PropsType = {
    setIsModalOpen: (value: boolean) => void
}
