import { CreditCard, DollarSign, PiggyBank } from 'lucide-react';
import DashboardSummaryCard from '@/components/Dashboard/DashboardSummaryCard/DashboardSummaryCard';
import RecentTransactionsTable from '@/components/Dashboard/RecentTransactionsTable/RecentTransactionsTable';

export default function Dashboard() {
    return (
        <>
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                <DashboardSummaryCard
                    title={'Checking Account'}
                    icon={DollarSign}
                    value={parseFloat('12,345,67')}
                    description={'+2.5% from last month'}
                />
                <DashboardSummaryCard
                    title={'Savings Account'}
                    icon={PiggyBank}
                    value={parseFloat('48,765.43')}
                    description={'+0.8% interest rate'}
                />
                <DashboardSummaryCard
                    title={'Credit Card'}
                    icon={CreditCard}
                    value={parseFloat('1,234.56')}
                    description={'Due in 15 days'}
                />
            </div>
            <RecentTransactionsTable />
        </>
    );
}
