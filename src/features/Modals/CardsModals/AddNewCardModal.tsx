import React, {useState} from 'react'

import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, {SelectChangeEvent} from '@mui/material/Select'

import {InputTypeFile} from '../../../common/components/InputTypeFile/InputTypeFile'
import {useAppDispatch} from '../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../common/hooks/useAppSelector'
import {createCardTC} from '../../Pages/CardsList/cardsListReducer'
import {CustomModal} from '../CustomModal'
import styles from '../customModal.module.scss'

export const AddNewCardModal: React.FC<AddNewCardModalPropsType> = ({
    isModalOpen,
    setIsModalOpen,
}) => {
    const [format, setFormat] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionImg, setQuestionImg] = useState('')
    const [answerImg, setAnswerImg] = useState('')

    const cardsPack_id = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)
    const dispatch = useAppDispatch()

    const addCard = (): void => {
        dispatch(createCardTC({question, answer, cardsPack_id, answerImg, questionImg}))
        setFormat('')
        setQuestion('')
        setAnswer('')
        setQuestionImg('')
        setAnswerImg('')
        setIsModalOpen(false)
    }

    const handleChange = (e: SelectChangeEvent): void => {
        setFormat(e.target.value)
    }

    return (
        <CustomModal
            modalTitle="Add new card"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={addCard}
            buttonTitle="Save"
        >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    Choose a question format
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={format}
                    label="Choose a question format"
                    onChange={handleChange}
                >
                    <MenuItem value="Text">Text</MenuItem>
                    <MenuItem value="Image">Image</MenuItem>
                </Select>
            </FormControl>
            {format &&
                (format === 'Text' ? (
                    <div>
                        <Input
                            value={question}
                            placeholder="Question"
                            onChange={e => setQuestion(e.currentTarget.value)}
                            fullWidth
                            style={{marginTop: '20px', marginBottom: '20px'}}
                        />
                        <Input
                            value={answer}
                            placeholder="Answer"
                            onChange={e => setAnswer(e.currentTarget.value)}
                            fullWidth
                            style={{marginBottom: '20px'}}
                        />
                    </div>
                ) : (
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
                        <InputTypeFile
                            buttonTitle="Upload Image"
                            setImage={setQuestionImg}
                        />
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
                        <InputTypeFile
                            buttonTitle="Upload Image"
                            setImage={setAnswerImg}
                        />
                    </div>
                ))}
        </CustomModal>
    )
}

type AddNewCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}
