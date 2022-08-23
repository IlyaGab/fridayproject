import React, {ReactElement} from 'react'

import {faStar} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import styles from './gradeStars.module.scss'

// eslint-disable-next-line no-magic-numbers
const stars: number[] = [1, 2, 3, 4, 5]

export const GradeStars = ({grade}: GradeStarsPropsType): ReactElement => {
    return (
        <div>
            {stars.map(star => (
                <FontAwesomeIcon
                    key={star}
                    className={grade >= star ? `${styles.iconYellow}` : `${styles.icon}`}
                    icon={faStar}
                    size="lg"
                />
            ))}
        </div>
    )
}

// Types
type GradeStarsPropsType = {
    grade: number
}
