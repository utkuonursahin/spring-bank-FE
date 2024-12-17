'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/Dashboard/RecentTransactionsTable/DataTable';
import { columns } from '@/components/Dashboard/RecentTransactionsTable/columns';
import { TransactionPageDto } from '@/dto/TransactionPageDto';
import { useState } from 'react';

async function getUserTransactions(page: number, size: number): Promise<AxiosResponse<TransactionPageDto>> {
    return axios(`http://localhost:8080/api/v1/transaction/me?page=${page}&size=${size}`, { withCredentials: true });
}

export default function TransactionsTable() {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10; // Number of transactions per page

    const { data, isLoading, isError } = useQuery({
        queryKey: ['transactions', currentPage],
        queryFn: () => getUserTransactions(currentPage, pageSize),
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching transactions</div>;

    const totalPages = data?.data.totalPages || 0;

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>Your transactions</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <div className="flex-grow overflow-auto">
                    <DataTable columns={columns} data={data?.data.transactions || []} />
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 
                            ${currentPage === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/50'}`}
                    >
                        Previous
                    </button>
                    <span className="self-center">
                        {currentPage + 1} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                        disabled={currentPage === totalPages - 1}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 
                            ${currentPage === totalPages - 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/50'}`}
                    >
                        Next
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
