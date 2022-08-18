import React from 'react';
import styles from './iconButton.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

type PropsType = {
    iconName: IconProp
    disabled?: boolean
    callback: () => void
}

export const IconButton: React.FC<PropsType> = (props) => {
    return (
        <button className={styles.btn}
                onClick={props.callback}
                disabled={props.disabled}
        >
            <FontAwesomeIcon
                className={styles.icon}
                icon={props.iconName} size="lg"
            />
        </button>
    )
}