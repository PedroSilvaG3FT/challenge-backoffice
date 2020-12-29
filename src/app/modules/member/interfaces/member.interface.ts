export interface MemberInterface { 
    id?: number;
    name: string;
    email: string;
    startingWeight: number;
    goalWeight: number;
    height: number;
    payday: number;
    isAdm: boolean;
    image: string;
    acceptTerm: boolean;
    currentStep: number;
    active: boolean;
    dateCreation: Date;
}