import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import LoginForm from '@/components/LoginForm/LoginForm';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen grid grid-cols-[1fr,40rem,1fr] items-center justify-center">
            <Card className="col-start-2 p-10 w-full grid grid-cols-2 gap-8">
                <CardHeader className="p-0">
                    <CardTitle className="text-green-600 text-2xl font-bold">Spring Bank</CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                        Secure access to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 p-0 text-primary">
                    <LoginForm />
                    <Separator />
                    <p className="text-secondary-foreground">
                        Don't have an account?{' '}
                        <Link href="/register" className="underline">
                            Sign up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
