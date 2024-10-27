'use client';
import useUserStore from '@/stores/UserStore';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardHeader() {
    const authUser = useUserStore((state) => state.user);
    return (
        <header className="flex gap-4 items-center">
            <SidebarTrigger />
            <h3 className="text-2xl font-semibold tracking-tight">
                Welcome back, <span className="capitalize">{authUser.firstName}</span>
            </h3>
        </header>
    );
}
