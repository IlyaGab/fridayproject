import React, {ReactElement} from "react";
import styles from "./gradeStars.module.scss";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const stars: number[] = [1, 2, 3, 4, 5]

export const GradeStars = ({grade}: GradeStarsPropsType): ReactElement => {
    return (
        <div>
            {stars.map(star => <FontAwesomeIcon key={star}
                className={grade >= star ? `${styles.iconYellow}` : `${styles.icon}`}
                icon={faStar} size="lg"/>)}
        </div>
    )
}

//Types
type GradeStarsPropsType = {
    grade: number
}