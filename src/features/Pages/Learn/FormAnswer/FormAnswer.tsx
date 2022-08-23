import React, {ChangeEvent, ReactElement} from 'react'

import styles from './formAnswer.module.scss'

const answers: AnswerType[] = [
    {value: 1, name: 'didNotKnow', message: 'Did not know'},
    {value: 2, name: 'forgot', message: 'Forgot'},
    {value: 3, name: 'aLotOfThought', message: 'A lot of thought'},
    {value: 4, name: 'confused', message: 'Сonfused'},
    {value: 5, name: 'knewTheAnswer', message: 'Knew the answer'},
]

export const FormAnswer = ({handleChangeRadioInput}: FormAnswerType): ReactElement => {
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        handleChangeRadioInput(Number(e.currentTarget.value))
    }

    return (
        <form>
            <p>Rate yourself:</p>
            {answers.map(answer => (
                <label
                    key={answer.name}
                    className={styles.inputForm}
                    htmlFor={answer.name}
                >
                    <input
                        type="radio"
                        id={answer.name}
                        name="answerForm"
                        value={answer.value}
                        onChange={handleOnChange}
                    />
                    {answer.message}
                </label>
            ))}
        </form>
    )
}

// Types
type FormAnswerType = {
    handleChangeRadioInput: (value: number) => void
}

type AnswerType = {
    value: number
    name: string
    message: string
}
