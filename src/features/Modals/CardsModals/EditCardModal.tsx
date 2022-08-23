import React, {useState} from 'react'

import Input from '@mui/material/Input'

import {CardType} from '../../../api/cardsAPI'
import {InputTypeFile} from '../../../common/components/InputTypeFile/InputTypeFile'
import {useAppDispatch} from '../../../common/hooks/useAppDispatch'
import {changeCardTC} from '../../Pages/CardsList/cardsListReducer'
import {CustomModal} from '../CustomModal'
import styles from '../customModal.module.scss'

export const EditCardModal: React.FC<EditCardModalPropsType> = ({
    isModalOpen,
    setIsModalOpen,
    row,
}) => {
    const [newQuestion, setNewQuestion] = useState(row.question ? row.question : '')
    const [newAnswer, setNewAnswer] = useState(row.answer ? row.answer : '')
    const [questionImg, setQuestionImg] = useState(row.questionImg ? row.questionImg : '')
    const [answerImg, setAnswerImg] = useState(row.answerImg ? row.answerImg : '')

    const dispatch = useAppDispatch()

    const editCard = (): void => {
        dispatch(
            changeCardTC({
                _id: row._id,
                questionImg,
                answerImg,
                question: newQuestion,
                answer: newAnswer,
            }),
        )
        setIsModalOpen(false)
    }

    return (
        <CustomModal
            modalTitle="Edit card name"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={editCard}
            buttonTitle="Save"
        >
            {questionImg ? (
                <div>
                    <div className={styles.text}>Question:</div>
                    <div className={styles.imageContainer}>
                        {questionImg && (
                            <img
                                src={questionImg}
                                alt="cardImage"
                                className={styles.image}
                            />
                        )}
                    </div>
                    <InputTypeFile buttonTitle="Upload Image" setImage={setQuestionImg} />
                    <div className={styles.text}>Answer:</div>
                    <div className={styles.imageContainer}>
                        {answerImg && (
                            <img
                                src={answerImg}
                                alt="cardImage"
                                className={styles.image}
                            />
                        )}
                    </div>
                    <InputTypeFile buttonTitle="Upload Image" setImage={setAnswerImg} />
                </div>
            ) : (
                <div>
                    <Input
                        value={newQuestion}
                        placeholder="Question"
                        onChange={e => setNewQuestion(e.currentTarget.value)}
                        fullWidth
                        style={{marginTop: '20px', marginBottom: '20px'}}
                    />
                    <Input
                        value={newAnswer}
                        placeholder="Answer"
                        onChange={e => setNewAnswer(e.currentTarget.value)}
                        fullWidth
                        style={{marginBottom: '20px'}}
                    />
                </div>
            )}
        </CustomModal>
    )
}

type EditCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    row: CardType
}
