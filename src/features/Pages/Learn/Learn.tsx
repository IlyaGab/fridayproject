import React, {ReactElement, useState} from "react";
import styles from "./learn.module.scss";
import {BackButton} from "../../../common/components/BackButton/BackButton";
import {Button} from "@mui/material";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {updateGradeTC} from "../CardsList/cardsListReducer";
import {getCard} from "../../../common/utils/getCards";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {CardType} from "../../../api/cardsAPI";
import {FormAnswer} from "./FormAnswer/FormAnswer";

export const Learn = (): ReactElement => {
    const dispatch = useAppDispatch()

    const cards = useAppSelector(state => state.cardsList.cards)

    const [showAnswer, setShowAnswer] = useState(false)
    const [grade, setGrade] = useState(1)
    const [isSelectedAnswer, setIsSelectedAnswer] = useState(false)

    let newQuestion: CardType = getCard(cards)

    const handleNextButton = () => {
        setShowAnswer(false)
        setIsSelectedAnswer(false)
        dispatch(updateGradeTC({grade, card_id: newQuestion._id}))
    }

    const handleChangeRadioInput = (value: number) => {
        setGrade(value)
        setIsSelectedAnswer(true)
    }

    return (
        <div className={styles.learnPage}>
            <div className={styles.container}>
                <BackButton/>
                <h2>
                    Learn “Pack Name”
                </h2>
                <div className={styles.learn}>
                    <span>Question:</span> {newQuestion && newQuestion.question}
                    <div className={styles.note}>Количество попыток ответов на
                        вопрос: {newQuestion && newQuestion.shots}</div>
                    {showAnswer
                        ? <div className={styles.answer}>
                            <span>Answer:</span> {newQuestion && newQuestion.answer}
                            <FormAnswer handleChangeRadioInput={handleChangeRadioInput}/>
                            <Button
                                type={"submit"}
                                variant={"contained"}
                                color={"primary"}
                                onClick={handleNextButton}
                                disabled={!isSelectedAnswer}
                                style={{width: "100%", borderRadius: "30px", marginTop: "30px"}}>
                                Next
                            </Button>
                        </div>
                        : <Button
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            onClick={() => {
                                setShowAnswer(true)
                            }}
                            style={{width: "100%", borderRadius: "30px", marginTop: "30px"}}>
                            Show answer
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}