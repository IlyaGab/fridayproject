import { Slider } from "@mui/material";
import React, { ReactElement } from "react";
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../../../../common/hooks/useAppSelector";
import { getMinPacksTC } from "../../packsListReducer";
import styles from "./numberOfCards.module.scss";

export const NumberOfCards = (): ReactElement => {

    const min = useAppSelector(state=> state.packsList.minCardsCount)
    const dispatch = useAppDispatch()
    const max = 110

    const [value, setValue] = React.useState<number[]>([min,max]);
    function valuetext(value: number) {
        return `${{value}}`;
    }

    
    const handleChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[])
      dispatch(getMinPacksTC(`?min=${min}&max=${max}`))
      console.log(newValue[0], newValue[1]);
      
    };

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