export interface DayExerciceMemberInterface {
    dayId: number,
    name: string,
    exercices: ItemExerciceMemberInterface[]
}

export interface ItemExerciceMemberInterface {
    id?: number,
    amount: number,
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
            amount: number,
            exercice: number
        }[]

    }[]
}