import { CreditCard, DollarSign, PiggyBank } from 'lucide-react';
import InfoCard from '@/components/Dashboard/InfoCard/InfoCard';
import RecentTransactionsTable from '@/components/Dashboard/RecentTransactionsTable/RecentTransactionsTable';
import { CardTitle } from '@/components/ui/card';
import DashboardHeader from '@/components/Dashboard/DashboardHeader/DashboardHeader';
import { Separator } from '@/components/ui/separator';

export default function Dashboard() {
    return (
        <div className="w-full flex flex-col gap-4 overflow-auto">
            <DashboardHeader />
            <Separator />
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                <InfoCard>
                    <InfoCard.Header>
                        <CardTitle className="text-sm font-medium">{'Checking Account'}</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </InfoCard.Header>
                    <InfoCard.Body>
                        <div className="text-2xl font-bold">{parseFloat('12,345,67')}</div>
                        <p className="text-xs text-muted-foreground">{'+2.5% from last month'}</p>
                    </InfoCard.Body>
                </InfoCard>
                <InfoCard>
                    <InfoCard.Header>
                        <CardTitle className="text-sm font-medium">{'Savings Account'}</CardTitle>
                        <PiggyBank className="h-4 w-4 text-muted-foreground" />
                    </InfoCard.Header>
                    <InfoCard.Body>
                        <div className="text-2xl font-bold">{parseFloat('48,765.43')}</div>
                        <p className="text-xs text-muted-foreground">{'+0.8% interest rate'}</p>
                    </InfoCard.Body>
                </InfoCard>
                <InfoCard>
                    <InfoCard.Header>
                        <CardTitle className="text-sm font-medium">{'Credit Card'}</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </InfoCard.Header>
                    <InfoCard.Body>
                        <div className="text-2xl font-bold">{parseFloat('1,234.56')}</div>
                        <p className="text-xs text-muted-foreground">{'Due in 15 days'}</p>
                    </InfoCard.Body>
                </InfoCard>
            </div>
            <RecentTransactionsTable />
        </div>
    );
}
