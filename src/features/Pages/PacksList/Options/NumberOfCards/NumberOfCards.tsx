import {Slider} from "@mui/material";
import React, {ReactElement, useEffect} from "react";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {setQueryParamsAC} from "../../packsListReducer";
import styles from "./numberOfCards.module.scss";
import {useSearchParams} from "react-router-dom";

const min = 0
const max = 110

export const NumberOfCards = (): ReactElement => {
    const dispatch = useAppDispatch()

    const [search, setSearch] = useSearchParams()

    const minValue = Number(search.get("min")) || min
    const maxValue = Number(search.get("max")) || max

    const [value, setValue] = React.useState<number[]>([minValue, maxValue]);

    function valueText(value: number) {
        return `${{value}}`
    }

    const handleChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | number[]): void => {
        setValue(newValue as number[])
        search.set(`min`, `${value[0]}`)
        search.set(`max`, `${value[1]}`)
        setSearch(search)
    }

    useEffect(() => {
        dispatch(setQueryParamsAC({min: minValue, max: maxValue}))
    }, [dispatch, minValue, maxValue])

    return (
        <div className={styles.numberOfCards}>
            <h3>
                Number of cards
            </h3>
            <div className={styles.slider}>
                <div className={styles.value}>{value[0]}</div>
                <Slider
                    value={value}
                    onChangeCommitted={handleChangeCommitted}
                    valueLabelDisplay="auto"
                    getAriaValueText={valueText}
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