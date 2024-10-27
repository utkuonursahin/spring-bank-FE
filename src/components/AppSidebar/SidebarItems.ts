import { Cog, Home, IdCard, PiggyBank, Receipt } from 'lucide-react';

export const SidebarItems = [
    {
        title: 'Home',
        icon: Home,
        href: '/home'
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
