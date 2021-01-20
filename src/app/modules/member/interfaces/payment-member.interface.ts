export interface PaymentMemberInterface {
    id?: number,
    userId: number,
    paymentId?: number,
    value: number,
    active: boolean,
    dueDate: Date,
    dateCreation: Date,

    payday?: number
}