'use client';
import { IdCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import loginFormSchema from '@/components/LoginForm/LoginFormSchema';
import LoginFormSchema from '@/components/LoginForm/LoginFormSchema';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { GenericResponse } from '@/enum/GenericResponse';
import { UserDto } from '@/enum/UserDto';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/UserStore';

export default function LoginForm() {
    const loginForm = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            ssn: '',
            password: ''
        }
    });
    const router = useRouter();

    const setUserGlobal = useUserStore((state) => state.setUser);

    const mutation = useMutation({
        mutationFn: (values: z.infer<typeof LoginFormSchema>): Promise<AxiosResponse<GenericResponse<UserDto>>> => {
            return axios.post('http://localhost:8080/api/v1/auth/login', values, { withCredentials: true });
        },
        onSuccess: ({ data: { data: authenticatedUser } }) => {
            toast.success(`Login successful, welcome back ${authenticatedUser?.firstName} 👋`);
            setUserGlobal(authenticatedUser);
            router.push('/home');
        },
        onError: ({
            response: { data: { message } } = {} as AxiosResponse<GenericResponse<boolean>>
        }: AxiosError<GenericResponse<boolean>>) => {
            toast.error(message);
        }
    });
    const handleSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
        mutation.mutate(values);
    };

    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={loginForm.control}
                    name="ssn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-1">
                                <IdCard className="h-[1.75cap]" />
                                <span>SSN</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="text-secondary-foreground"
                                    type="number"
                                    placeholder="Enter your ssn"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Your social security number</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-1">
                                <IdCard className="h-[1.75cap]" />
                                <span>Password</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="text-secondary-foreground"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Your Spring Bank password</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Login</Button>
            </form>
        </Form>
    );
}
