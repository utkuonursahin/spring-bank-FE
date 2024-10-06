import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import ReactQueryClientProvider from '@/components/ReactQueryClientProvider/ReactQueryClientProvider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = {
    title: 'Spring Bank',
    description: 'Secure money management for everyone'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={GeistSans.className}>
                <TooltipProvider delayDuration={100}>
                    <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
                    <Toaster />
                </TooltipProvider>
            </body>
        </html>
    );
}
