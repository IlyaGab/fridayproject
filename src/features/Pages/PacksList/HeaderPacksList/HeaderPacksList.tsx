import React, {ReactElement} from 'react'

import {useNavigate} from 'react-router-dom'

import {MyButton} from '../../../../common/components/MyButton/MyButton'
import {PATH} from '../../../../common/components/RoutesList/RoutersList'
import {useAppSelector} from '../../../../common/hooks/useAppSelector'

import styles from './headerPacksList.module.scss'

export const HeaderPacksList: React.FC<PropsType> = ({setIsModalOpen}): ReactElement => {
    const navigate = useNavigate()

    const status = useAppSelector(state => state.app.status)

    const handleClick = (): void => {
        setIsModalOpen(true)
    }

    const navigateToUsersList = (): void => {
        navigate(PATH.UsersList)
    }

    return (
        <div className={styles.header}>
            <h2>Packs List</h2>
            <MyButton name="Users list" callback={navigateToUsersList} />
            <MyButton
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
