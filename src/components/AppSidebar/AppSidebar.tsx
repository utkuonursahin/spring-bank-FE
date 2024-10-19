import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { SidebarItems } from '@/components/AppSidebar/SidebarItems';
import Link from 'next/link';

export default function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
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
            <SidebarFooter />
        </Sidebar>
    );
}
