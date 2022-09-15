import React, {ReactElement, useState} from 'react'

import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useSearchParams} from 'react-router-dom'

import noCover from '../../../../assets/img/nocover.jpg'
import {AddButton} from '../../../../common/components/AddButton/AddButton'
import {useAppSelector} from '../../../../common/hooks/useAppSelector'

import styles from './headerCardsList.module.scss'
import {Menu} from './Menu/Menu'

export const HeaderCardsList: React.FC<PropsType> = React.memo(
    ({setIsModalOpen}): ReactElement => {
        const cardsCount = useAppSelector(
            state => state.cardsList.infoCardsPack.cardsCount,
        )
        const isMyCards = useAppSelector(state => state.cardsList.infoCardsPack.isMyCards)
        const status = useAppSelector(state => state.app.status)
        const deckCover = useAppSelector(state => state.cardsList.infoCardsPack.deckCover)

        const [showMenu, setShowMenu] = useState<boolean>(false)

        const [searchParams] = useSearchParams()
        const packName = searchParams.get('packName')

        const handleAddNewCard = (): void => {
            setIsModalOpen(true)
        }
        const onClickSetShowMenu = (): void => {
            setShowMenu(!showMenu)
        }

        const onBlurSetShowMenu = (): void => {
            const delayBlur = 200

            setTimeout(() => {
                setShowMenu(false)
            }, delayBlur)
        }

        return (
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <h2>
                        {packName}
                        {isMyCards && (
                            <button
                                type="button"
                                className={styles.btnMenu}
                                onClick={onClickSetShowMenu}
                                onBlur={onBlurSetShowMenu}
                            >
                                <FontAwesomeIcon
                                    className={styles.icon}
                                    icon={faEllipsisVertical}
                                    size="sm"
                                />
                                {showMenu && <Menu />}
                            </button>
                        )}
                    </h2>
                    {isMyCards && !!cardsCount && (
                        <AddButton
                            name="Add new card"
                            callback={handleAddNewCard}
                            disabled={status === 'loading'}
                        />
                    )}
                </div>
                <img
                    src={deckCover || noCover}
                    alt="deckCover"
                    style={{width: '75px', height: '40px'}}
                />
            </div>
        )
    },
)

type PropsType = {
    setIsModalOpen: (value: boolean) => void
}
