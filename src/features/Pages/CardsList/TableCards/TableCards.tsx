import React, {ReactElement} from 'react'

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import dayjs from 'dayjs'

import {useAppSelector} from '../../../../common/hooks/useAppSelector'

import {CardsActionButtons} from './CardsActionButtons/CardsActionButtons'
import {GradeStars} from './GradeStars/GradeStars'
import styles from './tableCards.module.scss'

export const TableCards = (): ReactElement => {
    const rows = useAppSelector(state => state.cardsList.cards)
    const isMyCards = useAppSelector(state => state.cardsList.infoCardsPack.isMyCards)

    return (
        <div className={styles.tableCards}>
            <TableContainer component={Paper} style={{marginBottom: '0'}}>
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
                        {rows.map(row => (
                            <TableRow
                                key={row._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {row.answerImg ? (
                                        <img
                                            src={row.questionImg}
                                            alt="questionImg"
                                            style={{width: '75px', height: '40px'}}
                                        />
                                    ) : (
                                        row.question
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {row.answerImg ? (
                                        <img
                                            src={row.answerImg}
                                            alt="answerImg"
                                            style={{width: '75px', height: '40px'}}
                                        />
                                    ) : (
                                        row.answer
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {dayjs(row.updated).format('DD.MM.YYYY')}
                                </TableCell>
                                <TableCell align="left">
                                    <GradeStars grade={row.grade} />
                                </TableCell>
                                {isMyCards && (
                                    <TableCell align="center">
                                        <CardsActionButtons row={row} />
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
