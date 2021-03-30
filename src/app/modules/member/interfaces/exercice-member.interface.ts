export interface DayExerciceMemberInterface {
    dayId: number,
    name: string,
    exercices: ItemExerciceMemberInterface[]
}

export interface ItemExerciceMemberInterface {
    id?: number,
    amount: string,
    isLink?: boolean,
    linkUrl?: string,
    exercice?: {
        id: number,
        name: string,
    },
}

export interface ExerciceUserInterfaceDTO {
    id?: number,
    userId: number,
    days: {
        dayId: number,
        exercices: {
            amount: string,
            exercice: number
        }[]

    }[]
}