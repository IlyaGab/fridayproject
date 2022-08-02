import React from "react";
import styles from "./cardsPack.module.scss"
import { BackButton } from "../../../common/components/BackButton/BackButton";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAppSelector } from "../../../common/hooks/useAppSelector";


export const CardsList = () => {

    const rows = useAppSelector(state => state.cardsList.cards)

    return (
        <div className={styles.pack}>
            <div className={styles.container}>
                <BackButton />
                <h2>
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
                </h2>
            </div>
        </div>
    )
}