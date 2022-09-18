import React, {ReactElement} from 'react'

import {Slider} from '@mui/material'
import {useSearchParams} from 'react-router-dom'

import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../../../common/hooks/useAppSelector'
import {setPacksListQueryParamsAC} from '../../packsListReducer'

import styles from './numberOfCards.module.scss'

const minSlider = 0
const maxSlider = 110

export const NumberOfCards = (): ReactElement => {
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    const stateMin = useAppSelector(state => state.packsList.queryParams.min)
    const stateMax = useAppSelector(state => state.packsList.queryParams.max)
    const status = useAppSelector(state => state.app.status)

    const minValue = Number(searchParams.get('min')) || stateMin
    const maxValue = Number(searchParams.get('max')) || stateMax

    const [value, setValue] = React.useState<number[]>([minValue, maxValue])

    const handleChange = (event: Event, newValue: number | number[]): void => {
        setValue(newValue as number[])
        if (Array.isArray(newValue)) {
            searchParams.set(`min`, `${newValue[0]}`)
            searchParams.set(`max`, `${newValue[1]}`)
        }
        setSearchParams(searchParams)
    }

    const handleChangeCommitted = (
        event: React.SyntheticEvent | Event,
        value: number | number[],
    ): void => {
        // eslint-disable-next-line no-unused-expressions
        Array.isArray(value) &&
            dispatch(setPacksListQueryParamsAC({min: value[0], max: value[1]}))
    }

    return (
        <div className={styles.numberOfCards}>
            <h3>Number of cards</h3>
            <div className={styles.slider}>
                <div className={styles.value}>{value[0]}</div>
                <Slider
                    value={value}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommitted}
                    valueLabelDisplay="off"
                    disableSwap
                    min={minSlider}
                    max={maxSlider}
                    style={{display: 'inline-block'}}
                    disabled={status === 'loading'}
                />
                <div className={styles.value}>{value[1]}</div>
            </div>
        </div>
    )
}
