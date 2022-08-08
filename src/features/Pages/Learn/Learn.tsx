import React, {ChangeEvent, ReactElement, useEffect, useState} from "react";
import styles from "./learn.module.scss";
import {BackButton} from "../../../common/components/BackButton/BackButton";
import {Button} from "@mui/material";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {getCardsListTC, updateGradeTC} from "../CardsList/cardsListReducer";
import {getCard} from "../../../common/utils/getCards";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {CardType} from "../../../api/cardsAPI";
import {GradeType} from "../../../api/gradeAPI";

export const Learn = (): ReactElement => {
    const dispatch = useAppDispatch()

    const cards = useAppSelector(state => state.cardsList.cards)

    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const [grade, setGrade] = useState<GradeType>(1)

    let newQuestion: CardType = getCard(cards)

    const handleNextButton = () => {
        setShowAnswer(false)
        dispatch(updateGradeTC({grade, card_id: newQuestion._id}))
    }

    const handleChangeRadioInput = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setGrade(Number(e.currentTarget.value))
    }

    useEffect(() => {
        dispatch(getCardsListTC())
    }, [dispatch])

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
                    {!showAnswer && <Button
                        type={"submit"}
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => {
                            setShowAnswer(true)
                        }}
                        style={{width: "100%", borderRadius: "30px", marginTop: "30px"}}>
                        Show answer
                    </Button>}
                    {showAnswer
                        && <div className={styles.answer}>
                            <span>Answer:</span> {newQuestion && newQuestion.answer}
                            <form>
                                <p>Rate yourself:</p>
                                <label className={styles.inputForm} htmlFor="didNotKnow">
                                    <input type="radio" id="didNotKnow"
                                           name="answerForm" value={1}
                                           onChange={handleChangeRadioInput}
                                    />
                                    Did not know
                                </label>
                                <label className={styles.inputForm} htmlFor="forgot">
                                    <input type="radio" id="forgot"
                                           name="answerForm" value={2}
                                           onChange={handleChangeRadioInput}
                                    />
                                    Forgot
                                </label>
                                <label className={styles.inputForm} htmlFor="aLotOfThought">
                                    <input type="radio" id="aLotOfThought"
                                           name="answerForm" value={3}
                                           onChange={handleChangeRadioInput}
                                    />
                                    A lot of thought
                                </label>
                                <label className={styles.inputForm} htmlFor="confused">
                                    <input type="radio" id="confused"
                                           name="answerForm" value={4}
                                           onChange={handleChangeRadioInput}
                                    />
                                    Сonfused
                                </label>

                                <label className={styles.inputForm} htmlFor="knewTheAnswer">
                                    <input type="radio" id="knewTheAnswer"
                                           name="answerForm" value={5}
                                           onChange={handleChangeRadioInput}
                                    />
                                    Knew the answer
                                </label>
                            </form>
                            <Button
                                type={"submit"}
                                variant={"contained"}
                                color={"primary"}
                                onClick={handleNextButton}
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
