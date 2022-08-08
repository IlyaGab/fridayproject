import React, {ReactElement, useState} from "react";
import styles from "./learn.module.scss";
import {BackButton} from "../../../common/components/BackButton/BackButton";
import {Button} from "@mui/material";

export const Learn = (): ReactElement => {

    const [showAnswer, setShowAnswer] = useState<boolean>(false)

    return (
        <div className={styles.learnPage}>
            <div className={styles.container}>
                <BackButton/>
                <h2>
                    Learn “Pack Name”
                </h2>
                <div className={styles.learn}>
                    <span>Question:</span> How "This" works in JavaScript?
                    <div className={styles.note}>Количество попыток ответов на вопрос: 10</div>
                    {!showAnswer && < Button
                        type={"submit"}
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => {setShowAnswer(true)}}
                        style={{width: "100%", borderRadius: "30px", marginTop: "30px"}}>
                        Show answer
                        </Button>}
                    {showAnswer
                    &&   <div>
                            Answer: This is how "This" works in JavaScript
                            <Button
                                type={"submit"}
                                variant={"contained"}
                                color={"primary"}
                                style={{width: "100%", borderRadius: "30px", marginTop: "30px"}}>
                                Next
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}