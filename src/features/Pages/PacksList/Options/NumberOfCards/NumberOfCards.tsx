import {Slider} from '@mui/material';
import React, {ReactElement} from 'react';
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch';
import {setQueryParamsAC} from '../../packsListReducer';
import styles from './numberOfCards.module.scss';
import {useSearchParams} from 'react-router-dom';
import {useAppSelector} from '../../../../../common/hooks/useAppSelector';

const minSlider = 0
const maxSlider = 110

export const NumberOfCards = (): ReactElement => {
    const dispatch = useAppDispatch()

    const [search, setSearch] = useSearchParams()

    const stateMin = useAppSelector(state => state.packsList.queryParams.min)
    const stateMax = useAppSelector(state => state.packsList.queryParams.max)

    const minValue = Number(search.get('min')) || stateMin
    const maxValue = Number(search.get('max')) || stateMax

    const [value, setValue] = React.useState<number[]>([minValue, maxValue]);

    const handleChange = (event: Event, newValue: number | number[]): void => {
        setValue(newValue as number[])
        if (Array.isArray(newValue)) {
            search.set(`min`, `${newValue[0]}`)
            search.set(`max`, `${newValue[1]}`)
        }
        setSearch(search)
    }

    const handleChangeCommitted = (event: React.SyntheticEvent | Event, value: number | number[]) => {
        Array.isArray(value) && dispatch(setQueryParamsAC({min: value[0], max: value[1]}))
    }

    return (
        <div className={styles.numberOfCards}>
            <h3>
                Number of cards
            </h3>
            <div className={styles.slider}>
                <div className={styles.value}>{value[0]}</div>
                <Slider
                    value={value}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommitted}
                    valueLabelDisplay="auto"
                    disableSwap
                    min={minSlider}
                    max={maxSlider}
                    style={{display: 'inline-block'}}
                />
                <div className={styles.value}>{value[1]}</div>
            </div>
        </div>
    )
}