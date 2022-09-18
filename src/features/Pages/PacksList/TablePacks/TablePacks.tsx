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
import {SortIcon} from '../../../../common/components/SortIcon/SortIcon'
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../../common/hooks/useAppSelector'
import {setCardsQueryParamsAC, setInfoCardsPackAC} from '../../CardsList/cardsListReducer'
import {setUserProfileQueryParamsAC} from '../../Users/UserProfile/userProfileReducer'
import {setPacksListQueryParamsAC} from '../packsListReducer'

import {PacksActionButtons} from './PacksActionButtons/PacksActionButtons'
import styles from './tablePacks.module.scss'

export const TablePacks = (): ReactElement => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const rows = useAppSelector(state => state.packsList.cardPacks)
    const sortQueryName = useAppSelector(state => state.packsList.queryParams.sortPacks)

    const [sortValue, setSortValue] = useState<number>(0)

    const sortPacksHandler = (sortPacksName: string) => (): void => {
        // eslint-disable-next-line no-unused-expressions
        sortValue === 0 ? setSortValue(1) : setSortValue(0)
        dispatch(setPacksListQueryParamsAC({sortPacks: `${sortValue}${sortPacksName}`}))
    }

    const navigateToCardsPack =
        (cardsPack_id: string, packName: string, deckCover: string, cardsCount: number) =>
        (): void => {
            navigate(PATH.CardsList)
            dispatch(setCardsQueryParamsAC({cardsPack_id, pageCount: 5}))
            dispatch(setInfoCardsPackAC({packName, deckCover, cardsCount}))
        }

    const navigateToUserProfile = (id: string) => (): void => {
        dispatch(setUserProfileQueryParamsAC(id))
        navigate(PATH.UserProfile)
    }

    return (
        <div className={styles.tablePacks}>
            <TableContainer component={Paper} style={{marginBottom: '0'}}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={sortPacksHandler('name')}>
                                <span style={{cursor: 'pointer'}}>Name</span>
                                <SortIcon sortQueryName={sortQueryName} sortName="name" />
                            </TableCell>
                            <TableCell
                                align="center"
                                onClick={sortPacksHandler('cardsCount')}
                            >
                                <span style={{cursor: 'pointer'}}>Cards</span>
                                <SortIcon
                                    sortQueryName={sortQueryName}
                                    sortName="cardsCount"
                                />
                            </TableCell>
                            <TableCell
                                align="center"
                                onClick={sortPacksHandler('updated')}
                            >
                                <span style={{cursor: 'pointer'}}>Last Updates</span>
                                <SortIcon
                                    sortQueryName={sortQueryName}
                                    sortName="updated"
                                />
                            </TableCell>
                            <TableCell
                                align="center"
                                onClick={sortPacksHandler('user_name')}
                            >
                                <span style={{cursor: 'pointer'}}>Author</span>
                                <SortIcon
                                    sortQueryName={sortQueryName}
                                    sortName="user_name"
                                />
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
                                    style={{
                                        cursor: 'pointer',
                                        display: 'table-center',
                                        verticalAlign: 'middle',
                                        minHeight: '20px',
                                    }}
                                    onClick={navigateToCardsPack(
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
                                    <p
                                        style={{
                                            display: 'inline-block',
                                            height: '100%',
                                            position: 'relative',
                                            top: '-12px',
                                            marginLeft: '20px',
                                        }}
                                    >
                                        {row.name}
                                    </p>
                                </TableCell>
                                <TableCell align="center">{row.cardsCount}</TableCell>
                                <TableCell align="center">
                                    {dayjs(row.updated).format('DD.MM.YYYY')}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={navigateToUserProfile(row.user_id)}
                                >
                                    {row.user_name}
                                </TableCell>
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
