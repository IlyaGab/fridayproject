import React, {ReactElement, useEffect} from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import styles from "./tableCards.module.scss";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {getCardsListTC} from "../cardsListReducer";
import {CardsActionButtons} from "./CardsActionButtons/CardsActionButtons";
import {GradeStars} from "./GradeStars/GradeStars";

export const TableCards = (): ReactElement => {
    const dispatch = useAppDispatch()

    const rows = useAppSelector(state => state.cardsList.cards)
    const isMyCards = useAppSelector(state => state.cardsList.infoCardsPack.isMyCards)
    useEffect(() => {
        debugger
        dispatch(getCardsListTC())
    }, [dispatch ])

    return (
        <div className={styles.tableCards}>
            <TableContainer component={Paper} style={{marginBottom: "0"}}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Question</TableCell>
                            <TableCell align="left">Answer</TableCell>
                            <TableCell align="left">Last Updated</TableCell>
                            <TableCell align="left">Grade</TableCell>
                            {isMyCards && <TableCell align="center"> </TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{"&:last-child td, &:last-child th": {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {row.question}
                                </TableCell>
                                <TableCell align="left">{row.answer}</TableCell>
                                <TableCell align="left">{row.updated}</TableCell>
                                <TableCell align="left">
                                    <GradeStars grade={row.grade}/>
                                </TableCell>
                                {isMyCards && <TableCell align="center">
                                    <CardsActionButtons row={row}/>
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}