import React, {ReactElement, useState} from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import {useNavigate} from 'react-router-dom'

import noCover from '../../../../assets/img/nocover.jpg'
import {PATH} from '../../../../common/components/RoutesList/RoutersList'
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../../common/hooks/useAppSelector'
import {setCardsQueryParamsAC, setInfoCardsPackAC} from '../../CardsList/cardsListReducer'
import {setQueryParamsAC} from '../packsListReducer'

import {PacksActionButtons} from './PacksActionButtons/PacksActionButtons'
import {SortIcon} from './SortIcon/SortIcon'
import styles from './tablePacks.module.scss'

export const TablePacks = (): ReactElement => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const rows = useAppSelector(state => state.packsList.cardPacks)

    const [sortValue, setSortValue] = useState<number>(0)

    const sortPacksHandler = (sortPacksName: string) => (): void => {
        // eslint-disable-next-line no-unused-expressions
        sortValue === 0 ? setSortValue(1) : setSortValue(0)
        dispatch(setQueryParamsAC({sortPacks: `${sortValue}${sortPacksName}`}))
    }

    const navigateToCardsPackHandler =
        (cardsPack_id: string, packName: string, deckCover: string, cardsCount: number) =>
        (): void => {
            navigate(PATH.CardsList)
            dispatch(setCardsQueryParamsAC({cardsPack_id}))
            dispatch(setInfoCardsPackAC({packName, deckCover, cardsCount}))
        }

    return (
        <div className={styles.tablePacks}>
            <TableContainer component={Paper} style={{marginBottom: '0'}}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={sortPacksHandler('name')}>
                                <span style={{cursor: 'pointer'}}>Name</span>
                                <SortIcon name="name" />
                            </TableCell>
                            <TableCell
                                align="center"
                                onClick={sortPacksHandler('cardsCount')}
                            >
                                <span style={{cursor: 'pointer'}}>Cards</span>
                                <SortIcon name="cardsCount" />
                            </TableCell>
                            <TableCell
                                align="center"
                                onClick={sortPacksHandler('updated')}
                            >
                                <span style={{cursor: 'pointer'}}>Last Updates</span>
                                <SortIcon name="updated" />
                            </TableCell>
                            <TableCell
                                align="center"
                                onClick={sortPacksHandler('user_name')}
                            >
                                <span style={{cursor: 'pointer'}}>Author</span>
                                <SortIcon name="user_name" />
                            </TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow
                                key={row._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    style={{cursor: 'pointer'}}
                                    onClick={navigateToCardsPackHandler(
                                        row._id,
                                        row.name,
                                        row.deckCover,
                                        row.cardsCount,
                                    )}
                                >
                                    <img
                                        src={row.deckCover || noCover}
                                        alt="deckCover"
                                        style={{width: '75px', height: '40px'}}
                                    />
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.cardsCount}</TableCell>
                                <TableCell align="center">
                                    {dayjs(row.updated).format('DD.MM.YYYY')}
                                </TableCell>
                                <TableCell align="center">{row.user_name}</TableCell>
                                {}
                                <TableCell align="center">
                                    <PacksActionButtons row={row} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
