'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PortfolioSummary from '@/components/Investments/PortfolioSummary';
import HoldingsTable from '@/components/Investments/HoldingsTable';

const mockData = [
    { month: 'Jan', value: 10000 },
    { month: 'Feb', value: 10800 },
    { month: 'Mar', value: 10600 },
    { month: 'Apr', value: 11200 },
    { month: 'May', value: 11800 },
    { month: 'Jun', value: 12400 }
];

export default function InvestmentsPage() {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-2xl font-bold">Investments</h1>
            
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-lg">Portfolio Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <PortfolioSummary />
                <HoldingsTable />
            </div>
        </div>
    );
}
