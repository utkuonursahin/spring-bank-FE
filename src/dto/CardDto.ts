import { UserDto } from "./UserDto";

export type CardDto = {
    id: string,
    cardNumber: string,
    owner: UserDto,
    termExpense: number,
    cardLimit: number,
    isOpenToInternet: boolean,
    isOpenToInternationalTransactions: boolean,
    isOpenToContactlessPayments: boolean
}