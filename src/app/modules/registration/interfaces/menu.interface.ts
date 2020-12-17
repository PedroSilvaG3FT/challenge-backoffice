export interface MenuInterface {
    id?: number,
    name: string,
    qtdDays: number,
    active: boolean,
    dateCreation: Date,
}

export interface MenuInterfaceDTO {
    id?: string,
    name: string,
    days: MenuDayInterfaceDTO[]
}
export interface MenuDayInterfaceDTO {
    dayId: number,
    name: string,
    meals: MenuMealInterfaceDTO[]
}
export interface MenuMealInterfaceDTO {
    id?: number,
    typeMealId: number,
    name: string,
    descripition: string
}