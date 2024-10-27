import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar/AppSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex p-12 w-full min-h-screen">{children}</main>
        </SidebarProvider>
    );
}
