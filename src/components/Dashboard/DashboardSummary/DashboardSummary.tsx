'use client';

import axios, { AxiosResponse } from 'axios';
import { AccountDto } from '@/dto/AccountDto';
import { useQuery } from '@tanstack/react-query';
import DashboardSummaryCard from '@/components/Dashboard/DashboardSummary/DashboardSummaryCard/DashboardSummaryCard';
import { Card } from '@/components/ui/card';
import AddAccountModal from './AddAccountModal';

async function getAccountSummaries(): Promise<AxiosResponse<AccountDto[]>> {
    return axios('http://localhost:8080/api/v1/account/me', { withCredentials: true });
}

export default function DashboardSummary() {
    const accountsData = useQuery({
        queryKey: ['accounts'],
        queryFn: getAccountSummaries
    });
    const accounts = accountsData.data?.data;

    return (
        <div className="flex flex-row w-full gap-4">
            {accounts?.map((account: AccountDto) => (
                <DashboardSummaryCard account={account} key={account.id} />
            ))}
            {accounts?.length !== 3 && <AddAccountModal />}
        </div>
    );
}
