import React, {ReactElement} from 'react'

import GroupIcon from '@mui/icons-material/Group'
import {Button} from '@mui/material'
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
            <Button
                style={{fontSize: '20px', lineHeight: '24px'}}
                onClick={navigateToUsersList}
            >
                <GroupIcon />
            </Button>
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
