import axios, {AxiosError} from "axios";
import {setAppErrorAC} from "../../app/appReducer";
import {AppDispatchType} from "../../app/store";

export const handleServerNetworkError = (e: any, dispatch: AppDispatchType) => {
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
}