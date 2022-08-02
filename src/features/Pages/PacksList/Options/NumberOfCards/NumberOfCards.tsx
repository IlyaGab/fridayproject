import { Slider } from "@mui/material";
import React, {ReactElement, useEffect} from 'react';
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch";
import {getPackListTC, setMinMaxValueAC} from '../../packsListReducer';
import styles from "./numberOfCards.module.scss";
import {useDebounce} from '../../../../../common/hooks/useDebounce';

export const NumberOfCards = (): ReactElement => {
    const min = 0
    const max = 110
    const dispatch = useAppDispatch()

    const [value, setValue] = React.useState<number[]>([min,max]);
    const debouncedValue = useDebounce<number[]>(value, 500)
    function valuetext(value: number) {
        return `${{value}}`;
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    };

    useEffect(()=>{
        dispatch(setMinMaxValueAC(debouncedValue[0],debouncedValue[1]))
        dispatch(getPackListTC())
    },[dispatch, debouncedValue])

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
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    min={min}
                    max={max}
                    style={{display: "inline-block"}}
                />
                <div className={styles.value}>{value[1]}</div>
            </div>
        </div>
    )
}