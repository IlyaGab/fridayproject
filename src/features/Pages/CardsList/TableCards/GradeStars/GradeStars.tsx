import React, {ReactElement} from "react";
import styles from "./gradeStars.module.scss";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const GradeStars = ({grade}:GradeStarsType): ReactElement => {
    return (
        <div>
            <FontAwesomeIcon
                className={grade >= 1 ? `${styles.iconYellow}` : `${styles.icon}`}
                icon={faStar} size="lg"/>
            <FontAwesomeIcon
                className={grade >= 2 ? `${styles.iconYellow}` : `${styles.icon}`}
                icon={faStar} size="lg"/>
            <FontAwesomeIcon
                className={grade >= 3 ? `${styles.iconYellow}` : `${styles.icon}`}
                icon={faStar} size="lg"/>
            <FontAwesomeIcon
                className={grade >= 4 ? `${styles.iconYellow}` : `${styles.icon}`}
                icon={faStar} size="lg"/>
            <FontAwesomeIcon
                className={grade >= 5 ? `${styles.iconYellow}` : `${styles.icon}`}
                icon={faStar} size="lg"/>
        </div>
    )
}

//Types
type GradeStarsType = {
    grade: number
}