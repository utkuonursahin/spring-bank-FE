import { CreditCard, PiggyBank, Plus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardHeader from '@/components/Dashboard/DashboardHeader/DashboardHeader';
import Dashboard from '@/components/Dashboard/Dashboard';

export default function Home() {
    return (
        <main className="w-full flex flex-col gap-4 overflow-auto">
            <DashboardHeader />
            <Dashboard />

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button className="w-full">
                    <Send className="mr-2 h-4 w-4" /> Transfer
                </Button>
                <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Money
                </Button>
                <Button className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" /> Pay Bill
                </Button>
                <Button className="w-full">
                    <PiggyBank className="mr-2 h-4 w-4" /> Savings Goals
                </Button>
            </div>
        </main>
    );
}
