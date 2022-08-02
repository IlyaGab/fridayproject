import styles from "./tablePacks.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useState} from 'react';
import {getPackListTC, setSortPacksAC} from "../packsListReducer";
import React, {ReactElement} from "react";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {faGraduationCap, faPencil, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {changeNameCardsPackTC, deleteCardsPackTC} from "../packsListReducer";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../common/components/RoutesList/RoutersList";
import { getCardsListTC } from "../../CardsPack/cardsListReducer";

export const TablePacks = (): ReactElement => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const rows = useAppSelector(state => state.packsList.cardPacks)
    const userId = useAppSelector(state => state.profileReducer._id)

    

    const [count, setCount] = useState(0)

    const onClickSortHandler = () => {
        count === 0 ?setCount(1) : setCount(0)
        dispatch(setSortPacksAC(count,'cardsCount'))
        dispatch(getPackListTC())
    }

    const deleteCardsPackHandler = (id: string): void => {
        dispatch(deleteCardsPackTC(id))
    }

    const changeNameCardsPackHandler = (id: string, name: string): void => {
        dispatch(changeNameCardsPackTC(id, name))
    }

    const onClickNavigate = () => {
        navigate(PATH.Pack)
    }

    return (
        <div className={styles.tablePacks}>
            <TableContainer component={Paper} style={{marginBottom: "0"}}>
                <Table sx={{minWidth: 650}} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center" onClick={onClickSortHandler}>Cards</TableCell>
                            <TableCell align="center">Last Updates</TableCell>
                            <TableCell align="center">Created by</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row._id}
                                onClick={onClickNavigate}
                                sx={{"&:last-child td, &:last-child th": {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.cardsCount}</TableCell>
                                <TableCell align="center">{row.updated}</TableCell>
                                <TableCell align="center">{row.created}</TableCell>
                                <TableCell align="center">
                                    <button onClick={() => deleteCardsPackHandler(row._id)}
                                            className={styles.btn}
                                            disabled={userId !== row.user_id}
                                    ><FontAwesomeIcon
                                        className={styles.icon}
                                        icon={faTrashCan} size="lg"
                                    />
                                    </button>
                                    <button
                                        onClick={() => changeNameCardsPackHandler(row._id, "New name")}
                                        className={styles.btn}
                                        disabled={userId !== row.user_id}
                                    ><FontAwesomeIcon
                                        className={styles.icon}
                                        icon={faPencil} size="lg"/>
                                    </button>
                                    <button className={styles.btn}
                                            disabled={userId !== row.user_id}
                                    ><FontAwesomeIcon
                                        className={styles.icon}
                                        icon={faGraduationCap} size="lg"/>
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}