import { Cog, Home, IdCard, PiggyBank, Receipt } from 'lucide-react';

export const SidebarItems = [
    {
        title: 'Dashboard',
        icon: Home,
        href: '/dashboard'
    },
    {
        title: 'Accounts',
        icon: IdCard,
        href: '/accounts'
    },
    {
        title: 'Transactions',
        icon: Receipt,
        href: '/transactions'
    },
    {
        title: 'Investments',
        icon: PiggyBank,
        href: '/investments'
    },
    {
        title: 'Settings',
        icon: Cog,
        href: '/settings'
    }
];
