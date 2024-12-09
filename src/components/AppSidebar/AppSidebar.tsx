'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { SidebarItems } from '@/components/AppSidebar/SidebarItems';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import useUserStore from '@/stores/UserStore';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { LogOut } from 'lucide-react';
import CurrencyDisplay from '@/components/Dashboard/CurrencyDisplay/CurrencyDisplay';

export default function AppSidebar() {
    const authUser = useUserStore((state) => state.user);
    return (
        <Sidebar>
            <SidebarHeader>
                <h2 className="p-4 text-xl font-semibold text-primary ">Spring Bank</h2>
            </SidebarHeader>
            <SidebarContent className="px-4">
                <SidebarGroup />
                <SidebarGroupContent className="list-none">
                    {SidebarItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.href}>
                                    <item.icon />
                                    <p>{item.title}</p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter className="px-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="p-2 flex items-center gap-2 hover:bg-secondary rounded">
                            <Avatar>
                                <AvatarFallback>
                                    {authUser.firstName
                                        ?.at(0)
                                        ?.toUpperCase()
                                        ?.concat(authUser.lastName.at(0)?.toUpperCase() || '')}
                                </AvatarFallback>
                            </Avatar>
                            <p className="capitalize text-sm">
                                {authUser.firstName} {authUser.lastName}
                            </p>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-56" align="start" side="top">
                    <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-secondary cursor-pointer text-destructive">
                                <LogOut size={16} />
                                <span className="text-sm">Log out</span>
                            </div>
                    </PopoverContent>
                </Popover>
                <CurrencyDisplay />
            </SidebarFooter>
        </Sidebar>
    );
}
