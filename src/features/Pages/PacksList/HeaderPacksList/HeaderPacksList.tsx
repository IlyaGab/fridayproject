import React, {ReactElement} from 'react'

import {AddButton} from '../../../../common/components/AddButton/AddButton'
import {useAppSelector} from '../../../../common/hooks/useAppSelector'

import styles from './headerPacksList.module.scss'

export const HeaderPacksList: React.FC<PropsType> = ({setIsModalOpen}): ReactElement => {
    const status = useAppSelector(state => state.app.status)
    const handleClick = (): void => {
        setIsModalOpen(true)
    }

    return (
        <div className={styles.header}>
            <h2>Packs List</h2>
            <AddButton
                name="Add new pack"
                callback={handleClick}
                disabled={status === 'loading'}
            />
        </div>
    )
}

type PropsType = {
    setIsModalOpen: (value: boolean) => void
}
