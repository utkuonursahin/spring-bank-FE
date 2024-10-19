import DashboardHeader from '@/components/Dashboard/DashboardHeader/DashboardHeader';
import Dashboard from '@/components/Dashboard/Dashboard';

export default function Home() {
    return (
        <div className="w-full flex flex-col gap-4 overflow-auto">
            <DashboardHeader />
            <Dashboard />
        </div>
    );
}
