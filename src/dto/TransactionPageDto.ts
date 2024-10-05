import { TransactionDto } from '@/dto/TransactionDto';

export type TransactionPageDto = {
    transactions: TransactionDto[];
    size: number;
    page: number;
    totalPages: number;
    totalElements: number;
};
