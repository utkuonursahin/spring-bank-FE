import { Cog, IdCard, LayoutDashboard, PiggyBank, Receipt } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-background hidden md:block">
            <nav className="flex flex-col gap-4 text-green-500">
                <Link href="#" className="flex gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
                    <LayoutDashboard />
                    <p className="text-foreground">Dashboard</p>
                </Link>
                <Link href="#" className="flex gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
                    <IdCard />
                    <p className="text-foreground">Accounts</p>
                </Link>
                <Link href="#" className="flex gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
                    <Receipt />
                    <p className="text-foreground">Transactions</p>
                </Link>
                <Link href="#" className="flex gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
                    <PiggyBank />
                    <p className="text-foreground">Investments</p>
                </Link>
                <Link href="#" className="flex gap-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
                    <Cog />
                    <p className="text-foreground">Settings</p>
                </Link>
            </nav>
        </aside>
    );
}
