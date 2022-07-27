import React, {ChangeEvent, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import {TextField} from "@mui/material";
import styles from "./editableSpan.module.css"

export const EditableSpan: React.FC<EditableSpanType> = ({initialName, callback, className}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [name, setNewTitle] = useState<string>(initialName)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        setEditMode(false)
        callback(name)
    }
    const onDoubleClickHandler = () => {
        setEditMode(true)
    }

    return (
        <>
            {editMode
                ? (<TextField
                        style={{width: "100%"}}
                        label="Nickname"
                        defaultValue={name}
                        variant="standard"
                        autoFocus
                        onChange={onChangeHandler}
                        onBlur={onBlurHandler}
                    />
                ) : (
                    <span onDoubleClick={onDoubleClickHandler} className={className}> {name}
                        <FontAwesomeIcon className={styles.icon} icon={faPencil} size="sm"/>
                </span>
                )
            }
        </>
    )
}

//Types
type EditableSpanType = {
    initialName: string
    callback: (title: string) => void
    className?: string | undefined;
}