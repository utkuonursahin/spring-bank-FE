import Sidebar from '@/components/Sidebar/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex gap-4 min-h-screen p-12">
            <Sidebar />
            {children}
        </div>
    );
}
