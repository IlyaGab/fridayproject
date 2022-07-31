import React from "react";
import styles from "./headerPacksList.module.scss";
import {Button} from "@mui/material";

export const HeaderPacksList = () => {
    const onClickHandler = () => {
        alert("Add new pack")
    }

    return (
        <div className={styles.header}>
            <h2>
                Packs List
            </h2>
            <Button
                variant={"contained"}
                color={"primary"}
                style={{borderRadius: "30px", padding: "5px 30px"}}
                onClick={onClickHandler}
            >
                Add new pack
            </Button>
        </div>
    )
}