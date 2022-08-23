import React, {ReactElement} from 'react'

import {faArrowLeftLong} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useNavigate} from 'react-router-dom'

import {PATH} from '../RoutesList/RoutersList'

import styles from './backButton.module.scss'

export const BackButton = (): ReactElement => {
    const navigate = useNavigate()

    const onClickHandler = (): void => {
        navigate(PATH.PacksList)
    }

    return (
        <button type="button" className={styles.back} onClick={onClickHandler}>
            <FontAwesomeIcon icon={faArrowLeftLong} size="lg" />{' '}
            <span>Back to Packs List</span>
        </button>
    )
}
