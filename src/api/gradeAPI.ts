import {instance} from "./istanceSettings";

export const gradeAPI = {
    updateGrade(gradeParams: GradeParamsType) {
        return instance.put<UpdateGradeResponseType>("cards/grade", gradeParams)
    }
}

//Types
export type GradeParamsType = {
    grade: GradeType
    card_id: string
}

export type GradeType = 1 | 2 | 3 | 4 | 5 | number

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