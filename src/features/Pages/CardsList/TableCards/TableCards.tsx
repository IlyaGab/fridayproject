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

export const TableCards = (): ReactElement => {

    const rows = useAppSelector(state => state.cardsList.cards)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCardsListTC())
    }, [dispatch])

    return (
        <div className={styles.tableCards}>
            <TableContainer component={Paper} style={{ marginBottom: "0" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Question</TableCell>
                            <TableCell align="center">Answer</TableCell>
                            <TableCell align="center">Last Updated</TableCell>
                            <TableCell align="center">Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.question}
                                </TableCell>
                                <TableCell align="center">{row.answer}</TableCell>
                                <TableCell align="center">{row.updated}</TableCell>
                                <TableCell align="center">{row.grade}</TableCell>
                                <TableCell align="center">
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}