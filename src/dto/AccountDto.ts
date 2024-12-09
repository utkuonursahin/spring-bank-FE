import { UserDto } from '@/dto/UserDto';

export type AccountDto = {
    id?: string;
    owner?: UserDto;
    cash?: number;
    accountType?: string;
};
