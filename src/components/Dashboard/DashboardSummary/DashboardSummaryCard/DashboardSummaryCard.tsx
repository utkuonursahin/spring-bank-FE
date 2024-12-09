import React from 'react';
import { AccountDto } from '@/dto/AccountDto';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

type DashboardSummaryCardProps = {
    account: AccountDto;
};

const DashboardSummaryCard = ({ account }: DashboardSummaryCardProps) => {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">
                    {account.accountType?.toLowerCase().replace('_', ' ')} Account
                </CardTitle>
                <div className="p-2 bg-primary/25 rounded-full">
                    <Wallet className="h-4 w-4 text-primary" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{account.cash} $</div>
            </CardContent>
        </Card>
    );
};

export default DashboardSummaryCard;
