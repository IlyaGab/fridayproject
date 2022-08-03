import React, {ReactElement} from "react";
import {Button} from "@mui/material";
import styles from "./addButton.module.scss"

export const AddButton = ({name, callback}:AddButtonType): ReactElement => {
    return (
            <Button
                variant={"contained"}
                color={"primary"}
                className={styles.addButton}
                // style={{borderRadius: "30px", padding: "5px 30px"}}
                onClick={callback}
            >
                {name}
            </Button>
    )
}

//Types
type AddButtonType = {
    name: string
    callback: () => void
}