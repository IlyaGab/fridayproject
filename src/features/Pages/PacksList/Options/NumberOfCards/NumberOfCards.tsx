import { Slider } from "@mui/material";
import React, {ReactElement, useEffect} from 'react';
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch";
import { getPackListTC} from '../../packsListReducer';
import styles from "./numberOfCards.module.scss";

export const NumberOfCards = (): ReactElement => {
    const min = 0
    const max = 110
    const dispatch = useAppDispatch()

    const [value, setValue] = React.useState<number[]>([min,max]);
    function valuetext(value: number) {
        return `${{value}}`;
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    };

    useEffect(()=>{
        dispatch(getPackListTC(`?min=${value[0]}&max=${value[1]}`))
    },[dispatch,value])

    return (
        <div className={styles.numberOfCards}>
            <h3>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    min={min}
                    max={max}
                />
            </h3>
        </div>
    )
}