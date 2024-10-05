'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/Dashboard/RecentTransactionsTable/DataTable';
import { columns } from '@/components/Dashboard/RecentTransactionsTable/columns';
import { TransactionPageDto } from '@/dto/TransactionPageDto';

async function getLatestUserTransactions(): Promise<AxiosResponse<TransactionPageDto>> {
    return axios('http://localhost:8080/api/v1/transaction/me?page=0&size=10', { withCredentials: true });
}

export default function RecentTransactionsTable() {
    const transactions = useQuery({
        queryKey: ['transactions'],
        queryFn: getLatestUserTransactions
    });
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your last 5 transactions</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={transactions.data?.data.transactions || []} />
            </CardContent>
        </Card>
    );
}
