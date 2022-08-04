import React, {ReactElement} from "react";
import {Button} from "@mui/material";

export const AddButton = ({name, callback}:AddButtonType): ReactElement => {
    return (
            <Button
                variant={"contained"}
                color={"primary"}
                style={{borderRadius: "30px", padding: "5px 30px"}}
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