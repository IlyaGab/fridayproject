import {instance} from "./istanceSettings";

export const gradeAPI = {
    updateGrade(gradeParams: GradeParamsType) {
        return instance.put<UpdateGradeResponseType>("cards/grade", gradeParams)
    }
}

//Types
export type GradeParamsType = {
    grade: number
    card_id: string
}

export type UpdateGradeResponseType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
        created: string
        more_id: string
        updated: string
        __v: number
    }
}