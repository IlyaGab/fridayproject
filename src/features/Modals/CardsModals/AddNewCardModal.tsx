import React, {useState} from 'react';
import styles from '../customModal.module.scss'
import {CustomModal} from '../CustomModal';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {createCardTC} from '../../Pages/CardsList/cardsListReducer';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {InputTypeFile} from '../../../common/components/InputTypeFile/InputTypeFile';

export const AddNewCardModal: React.FC<AddNewCardModalPropsType> = ({isModalOpen, setIsModalOpen}) => {
    const [format, setFormat] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionImage, setQuestionImage] = useState('')
    const [answerImage, setAnswerImage] = useState('')

    const cardsPack_id = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)
    const dispatch = useAppDispatch()

    const addCard = () => {
        dispatch(createCardTC({question, answer, cardsPack_id}))
        setFormat('')
        setQuestion('')
        setAnswer('')
        setQuestionImage('')
        setAnswerImage('')
    }

    const handleChange = (e: SelectChangeEvent) => {
        setFormat(e.target.value)
    }

    return (
        <CustomModal
            modalTitle={'Add new card'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={addCard}
            buttonTitle={'Save'}
        >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose a question format</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={format}
                    label="Choose a question format"
                    onChange={handleChange}
                >
                    <MenuItem value={'Text'}>Text</MenuItem>
                    <MenuItem value={'Image'}>Image</MenuItem>
                </Select>
            </FormControl>
            {format && (format === 'Text'
                ?
                <div>
                    <Input
                        value={question}
                        placeholder={'Question'}
                        onChange={e => setQuestion(e.currentTarget.value)}
                        fullWidth={true}
                        style={{marginTop: '20px', marginBottom: '20px'}}
                    />
                    <Input
                        value={answer}
                        placeholder={'Answer'}
                        onChange={e => setAnswer(e.currentTarget.value)}
                        fullWidth={true}
                        style={{marginBottom: '20px'}}
                    />
                </div>
                :
                <div>
                    <div className={styles.text}>Question:</div>
                    {questionImage && <img src={questionImage} alt="cardImage" width={'100%'} height={120}/>}
                    <InputTypeFile
                        buttonTitle={'Upload Image'}
                        setImage={setQuestionImage}
                    />
                    <div className={styles.text}>Answer:</div>
                    {answerImage && <img src={answerImage} alt="cardImage" width={'100%'} height={120}/>}
                    <InputTypeFile
                        buttonTitle={'Upload Image'}
                        setImage={setAnswerImage}
                    />
                </div>)
            }
        </CustomModal>
    )
}

type AddNewCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}
