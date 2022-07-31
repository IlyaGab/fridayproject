import styles from "./tablePacks.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {ReactElement, useEffect} from "react";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {getPackListTC} from "../packsListReducer";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";

export const TablePacks = (): ReactElement => {
    const dispatch = useAppDispatch()
    const rows = useAppSelector(state => state.packsList.cardPacks)
    useEffect(() => {
        dispatch(getPackListTC())
    }, [])

    return (
        <div className={styles.tablePacks}>
            <TableContainer component={Paper} style={{marginBottom: "0"}}>
                <Table sx={{minWidth: 650}} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Cards</TableCell>
                            <TableCell align="right">Last Updates</TableCell>
                            <TableCell align="right">Created by</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{"&:last-child td, &:last-child th": {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.cardsCount}</TableCell>
                                <TableCell align="right">{row.updated}</TableCell>
                                <TableCell align="right">{row.created}</TableCell>
                                <TableCell align="right">delete</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}