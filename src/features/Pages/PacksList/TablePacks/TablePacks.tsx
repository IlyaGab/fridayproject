import styles from "./tablePacks.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, {ReactElement, useEffect, useState} from "react";
import {getPackListTC, setQueryParamsAC} from "../packsListReducer";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {PATH} from "../../../../common/components/RoutesList/RoutersList";
import {useNavigate} from "react-router-dom";
import {
    setCardsCountAC,
    setCardsQueryParamsAC, setIsMyCardsAC,
    setPackNameAC
} from "../../CardsList/cardsListReducer";
import {SortIcon} from "./SortIcon/SortIcon";
import {PacksActionButtons} from "./PacksActionButtons/PacksActionButtons";

export const TablePacks = (): ReactElement => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const rows = useAppSelector(state => state.packsList.cardPacks)
    const sortPacks = useAppSelector(state => state.packsList.queryParams.sortPacks)
    const min = useAppSelector(state => state.packsList.queryParams.min)
    const max = useAppSelector(state => state.packsList.queryParams.max)
    const pageCount = useAppSelector(state => state.packsList.queryParams.pageCount)
    const page = useAppSelector(state => state.packsList.queryParams.page)
    const user_id = useAppSelector(state => state.packsList.queryParams.user_id)
    const userId = useAppSelector(state => state.profileReducer._id)

    const [sortValue, setSortValue] = useState<number>(0)

    const sortPacksHandler = (sortPacksName: string) => (): void => {
        sortValue === 0 ? setSortValue(1) : setSortValue(0)
        dispatch(setQueryParamsAC({sortPacks: `${sortValue}${sortPacksName}`}))
    }

    const navigateToCardsPackHandler = (cardsPack_id: string, packName: string, cardsCount: number, user_id: string) => (): void => {
        navigate(PATH.CardsList)
        dispatch(setCardsQueryParamsAC({cardsPack_id}))
        dispatch(setPackNameAC(packName))
        dispatch(setCardsCountAC(cardsCount))
        if(user_id === userId) {
            dispatch(setIsMyCardsAC(true))
        } else {
            dispatch(setIsMyCardsAC(false))
        }
    }

    useEffect(() => {
        dispatch(getPackListTC())
    }, [ dispatch, sortPacks, min, max, page, pageCount, user_id])

    return (
        <div className={styles.tablePacks}>
            <TableContainer component={Paper} style={{marginBottom: "0"}}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                onClick={sortPacksHandler("name")}>
                                Name <SortIcon name={"name"}/>
                            </TableCell>
                            <TableCell align="center"
                                       onClick={sortPacksHandler("cardsCount")}>
                                Cards <SortIcon name={"cardsCount"}/>
                            </TableCell>
                            <TableCell align="center" onClick={sortPacksHandler("updated")}>
                                Last
                                Updates <SortIcon name={"updated"}/>
                            </TableCell>
                            <TableCell align="center" onClick={sortPacksHandler("user_name")}>
                                Author <SortIcon name={"user_name"}/>
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
                                sx={{"&:last-child td, &:last-child th": {border: 0}}}
                            >
                                <TableCell component="th" scope="row"
                                           onClick={navigateToCardsPackHandler(row._id, row.name, row.cardsCount, row.user_id)}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.cardsCount}</TableCell>
                                <TableCell align="center">{row.updated}</TableCell>
                                <TableCell align="center">{row.user_name}</TableCell>
                                {}
                                <TableCell align="center">
                                    <PacksActionButtons row={row}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}