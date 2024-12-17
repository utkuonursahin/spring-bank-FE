'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { BuyStockDialog } from './BuyStockDialog';
import { SellStockDialog } from './SellStockDialog';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AccountStockDto } from '@/dto/AccountStockDto';

const fetchAccountStocks = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/account-stock/me', {
        withCredentials: true
    });
    return response.data as AccountStockDto[];
};

export default function HoldingsTable() {
    const { data: accountStocks, isLoading, isError } = useQuery({
        queryKey: ['accountStocks'],
        queryFn: fetchAccountStocks
    });

    if (isLoading) {
        return (
            <Card className="col-span-full">
                <CardContent className="p-6">
                    Loading stocks...
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="col-span-full">
                <CardContent className="p-6 text-red-600">
                    Error loading stocks
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Holdings</CardTitle>
                <div className="flex gap-4">
                    <BuyStockDialog />
                    <SellStockDialog stocks={accountStocks} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {accountStocks?.map((holding) => (
                        <div
                            key={holding.id}
                            className="flex items-center justify-between p-2 hover:bg-muted rounded-lg"
                        >
                            <div>
                                <div className="font-medium">{holding.stock.stockCode}</div>
                                <div className="text-sm text-muted-foreground">
                                    {holding.quantity} shares
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium">
                                    ${holding.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    ${(holding.value / holding.quantity).toLocaleString('en-US', { 
                                        minimumFractionDigits: 2 
                                    })} per share
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {accountStocks?.length === 0 && (
                        <div className="text-center text-muted-foreground py-4">
                            No stocks in portfolio
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
} 