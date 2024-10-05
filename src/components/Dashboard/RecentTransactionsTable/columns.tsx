import { ColumnDef } from '@tanstack/table-core';
import { TransactionDto } from '@/dto/TransactionDto';
import { AccountDto } from '@/dto/AccountDto';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const columns: ColumnDef<TransactionDto>[] = [
    {
        accessorKey: 'type',
        header: 'Transaction Type',
        cell: (cell) => {
            return <p>{cell.row.getValue('type')}</p>;
        }
    },
    {
        accessorKey: 'sender',
        header: 'Sender',
        cell: (cell) => {
            const account: AccountDto = cell.row.getValue('sender');
            return (
                <Tooltip>
                    <TooltipContent className="capitalize">
                        {account.owner.firstName} {account.owner.lastName}
                    </TooltipContent>
                    <TooltipTrigger>{account.id}</TooltipTrigger>
                </Tooltip>
            );
        }
    },
    {
        accessorKey: 'receiver',
        header: 'Receiver',
        cell: (cell) => {
            const account: AccountDto = cell.row.getValue('receiver');
            return (
                <Tooltip>
                    <TooltipContent className="capitalize">
                        {account.owner.firstName} {account.owner.lastName}
                    </TooltipContent>
                    <TooltipTrigger>{account.id}</TooltipTrigger>
                </Tooltip>
            );
        }
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(amount);

            return <p>{formatted}</p>;
        }
    }
];
