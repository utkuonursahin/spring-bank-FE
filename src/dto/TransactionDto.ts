import { TransactionType } from '@/enum/TransactionType';
import { AccountDto } from '@/dto/AccountDto';

export type TransactionDto = {
    id: string;
    type: TransactionType;
    sender: AccountDto;
    receiver: AccountDto;
    amount: number;
};
