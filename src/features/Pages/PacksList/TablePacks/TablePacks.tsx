import styles from "./tablePacks.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, {ReactElement, useEffect, useState} from "react";
import {
    getPackListTC,
    setQueryParamsAC
} from "../packsListReducer";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {faGraduationCap} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {PATH} from "../../../../common/components/RoutesList/RoutersList";
import {useNavigate} from "react-router-dom";
import {getCardsListTC, setCardsQueryParamsAC} from "../../CardsList/cardsListReducer";
import {setAppStatusAC} from "../../../../app/appReducer";
import {SortIcon} from "./Sort/SortIcon";
import { EditPackModal } from "../../../modals/EditPackModal/EditPackModal";
import { DeletePackModal } from "../../../modals/DeletePackModal/DeletePackModal";

export const TablePacks = (): ReactElement => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const rows = useAppSelector(state => state.packsList.cardPacks)
    const userId = useAppSelector(state => state.profileReducer._id)

    const [sortValue, setSortValue] = useState<number>(0)

    const sortPacksHandler = (sortPacksName: string) => (): void => {
        sortValue === 0 ? setSortValue(1) : setSortValue(0)
        dispatch(setQueryParamsAC({sortPacks: sortValue, sortPacksName: sortPacksName}))
        dispatch(getPackListTC())
    }

    const navigateToCardsPackHandler = (cardsPack_id: string, packName: string, cardsCount: number) => (): void => {
        navigate(PATH.CardsList)
        dispatch(setAppStatusAC('loading'))
        dispatch(setCardsQueryParamsAC({cardsPack_id, packName, cardsCount}))
        dispatch(getCardsListTC())
    }

    useEffect(() => {
        dispatch(getPackListTC())
    }, [dispatch])

    return (
        <div className={styles.tablePacks}>
            <TableContainer component={Paper} style={{marginBottom: '0'}}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                onClick={sortPacksHandler('name')}>
                                Name <SortIcon name={'name'}/>
                            </TableCell>
                            <TableCell align="center"
                                       onClick={sortPacksHandler('cardsCount')}>
                                Cards <SortIcon name={'cardsCount'}/>
                            </TableCell>
                            <TableCell align="center" onClick={sortPacksHandler('updated')}>
                                Last
                                Updates <SortIcon name={'updated'}/>
                            </TableCell>
                            <TableCell align="center" onClick={sortPacksHandler('created')}>
                                Created by <SortIcon name={'created'}/>
                            </TableCell>
                            <TableCell align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row"
                                           onClick={navigateToCardsPackHandler(row._id, row.name, row.cardsCount)}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.cardsCount}</TableCell>
                                <TableCell align="center">{row.updated}</TableCell>
                                <TableCell align="center">{row.created}</TableCell>
                                <TableCell align="center">
                                    <DeletePackModal userId={userId} row={row}/>
                                    <EditPackModal userId={userId} row={row}/>
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