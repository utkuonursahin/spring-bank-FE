import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import ReactQueryClientProvider from '@/components/ReactQueryClientProvider/ReactQueryClientProvider';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
    title: 'Spring Bank',
    description: 'Secure money management for everyone'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={GeistSans.className}>
                <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
                <Toaster />
            </body>
        </html>
    );
}
