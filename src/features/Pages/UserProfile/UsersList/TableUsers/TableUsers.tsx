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

import defaultAvatar from '../../../../../assets/img/default-avatar.png'
import {PATH} from '../../../../../common/components/RoutesList/RoutersList'
import {SortIcon} from '../../../../../common/components/SortIcon/SortIcon'
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../../../common/hooks/useAppSelector'
import {setUserProfileQueryParamsAC} from '../../UserProfile/userProfileReducer'
import {setUsersListQueryParamsAC} from '../usersListReducer'

import styles from './tablePacks.module.scss'

export const TableUsers = (): ReactElement => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const rows = useAppSelector(state => state.usersList.users)
    const sortQueryName = useAppSelector(state => state.usersList.queryParams.sortUsers)

    const [sortValue, setSortValue] = useState<number>(0)

    const sortPacksHandler = (sortUsers: string) => (): void => {
        // eslint-disable-next-line no-unused-expressions
        sortValue === 0 ? setSortValue(1) : setSortValue(0)
        dispatch(setUsersListQueryParamsAC({sortUsers: `${sortValue}${sortUsers}`}))
    }

    const navigateToUserProfile = (id: string) => (): void => {
        dispatch(setUserProfileQueryParamsAC(id))
        navigate(PATH.UserProfile)
    }

    return (
        <div className={styles.tableUsers}>
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
                                onClick={sortPacksHandler('avatar')}
                            >
                                <span style={{cursor: 'pointer'}}>Avatar</span>
                                <SortIcon
                                    sortQueryName={sortQueryName}
                                    sortName="avatar"
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
                            <TableCell align="center" onClick={sortPacksHandler('email')}>
                                <span style={{cursor: 'pointer'}}>Email</span>
                                <SortIcon
                                    sortQueryName={sortQueryName}
                                    sortName="email"
                                />
                            </TableCell>
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
                                    onClick={navigateToUserProfile(row._id)}
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    <img
                                        src={row.avatar || defaultAvatar}
                                        alt="Avatar"
                                        style={{width: '100px'}}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    {dayjs(row.updated).format('DD.MM.YYYY')}
                                </TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
