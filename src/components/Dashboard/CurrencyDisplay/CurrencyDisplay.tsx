'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CurrencyDisplay() {
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                // Replace with your preferred currency API
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const data = await response.json();
                setExchangeRate(data.rates.TRY); // Assuming we're converting USD to EUR
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch exchange rate:', error);
                setIsLoading(false);
            }
        };

        fetchExchangeRate();
    }, []);

    return (
        <Card className="mt-auto self-center w-48 h-8 flex items-center justify-center bg-black text-white">
            <CardContent className="p-0 flex items-center justify-center">
                {isLoading ? (
                    <Skeleton className="bg-gray-700" />
                ) : exchangeRate ? (
                    <p className="">1 USD = {exchangeRate.toFixed(2)} TRY</p>
                ) : (
                    <p className="text-sm">Failed to load exchange rate</p>
                )}
            </CardContent>
        </Card>
    );
}
