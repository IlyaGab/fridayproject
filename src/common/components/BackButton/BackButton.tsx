import React, {ReactElement} from 'react'

import {faArrowLeftLong} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useNavigate} from 'react-router-dom'

import styles from './backButton.module.scss'

export const BackButton = ({path, title}: BackButtonPropsType): ReactElement => {
    const navigate = useNavigate()

    const onClickHandler = (): void => {
        navigate(path)
    }

    return (
        <button type="button" className={styles.back} onClick={onClickHandler}>
            <FontAwesomeIcon icon={faArrowLeftLong} size="lg" /> <span>{title}</span>
        </button>
    )
}

type BackButtonPropsType = {
    path: string
    title: string
}
