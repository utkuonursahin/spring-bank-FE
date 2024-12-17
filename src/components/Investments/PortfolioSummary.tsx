'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AccountDto } from '@/dto/AccountDto';

const fetchCurrentAccount = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/account/me/SAVINGS', {
        withCredentials: true
    });
    return response.data as AccountDto;
};

export default function PortfolioSummary() {
    const { data: accountData, isLoading } = useQuery({
        queryKey: ['currentAccount'],
        queryFn: fetchCurrentAccount
    });

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg">Portfolio Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Available Cash</span>
                                <span className="text-lg font-bold">
                                    ${accountData?.cash?.toLocaleString('en-US', { minimumFractionDigits: 2 }) ?? '0.00'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Account Type</span>
                                <span className="capitalize">{accountData?.accountType?.toLowerCase()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Account ID</span>
                                <span className="text-sm font-mono">{accountData?.id}</span>
                            </div>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
} 