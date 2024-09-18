import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, DollarSign, PiggyBank } from 'lucide-react';

export default function Dashboard() {
    return (
        <>
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Checking Account</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,345.67</div>
                        <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Savings Account</CardTitle>
                        <PiggyBank className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$48,765.43</div>
                        <p className="text-xs text-muted-foreground">+0.8% interest rate</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Credit Card</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,234.56</div>
                        <p className="text-xs text-muted-foreground">Due in 15 days</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your last 5 transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {[
                            { name: 'Grocery Store', amount: -82.56, date: '2023-06-01' },
                            { name: 'Salary Deposit', amount: 3500.0, date: '2023-05-31' },
                            { name: 'Electric Bill', amount: -124.79, date: '2023-05-30' },
                            { name: 'Online Shopping', amount: -65.99, date: '2023-05-29' },
                            { name: 'Restaurant', amount: -45.5, date: '2023-05-28' }
                        ].map((transaction, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{transaction.name}</p>
                                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                                </div>
                                <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                                    ${Math.abs(transaction.amount).toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </>
    );
}
