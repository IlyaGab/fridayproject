import React, {ChangeEvent, useState} from 'react'

import {faPencil} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {TextField} from '@mui/material'

import styles from './editableSpan.module.scss'

export const EditableSpan: React.FC<EditableSpanType> = ({
    initialName,
    callback,
    className,
}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [name, setNewTitle] = useState<string>(initialName)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewTitle(e.currentTarget.value)
    }
    const onBlurHandler = (): void => {
        setEditMode(false)
        callback(name)
    }
    const onDoubleClickHandler = (): void => {
        setEditMode(true)
    }

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {editMode ? (
                <TextField
                    style={{width: '100%'}}
                    label="Nickname"
                    defaultValue={name}
                    variant="standard"
                    autoFocus
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                />
            ) : (
                <span onDoubleClick={onDoubleClickHandler} className={className}>
                    {name}
                    <FontAwesomeIcon className={styles.icon} icon={faPencil} size="sm" />
                </span>
            )}
        </>
    )
}

// Types
type EditableSpanType = {
    initialName: string
    callback: (title: string) => void
    className?: string | undefined
}
