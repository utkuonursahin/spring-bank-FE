import RecentTransactionsTable from '@/components/Dashboard/RecentTransactionsTable/RecentTransactionsTable';
import DashboardHeader from '@/components/Dashboard/DashboardHeader/DashboardHeader';
import { Separator } from '@/components/ui/separator';
import DashboardSummary from './DashboardSummary/DashboardSummary';

export default function Dashboard() {
    return (
        <div className="w-full flex flex-col gap-4 overflow-auto">
            <DashboardHeader />
            <Separator />
            <DashboardSummary />
            <RecentTransactionsTable />
        </div>
    );
}
