'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import RegisterFormSchema from '@/components/RegisterForm/RegisterFormSchema';
import registerFormSchema from '@/components/RegisterForm/RegisterFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { IdCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { GenericResponse } from '@/enum/GenericResponse';
import { UserDto } from '@/enum/UserDto';

export default function RegisterForm() {
    const registerForm = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            ssn: '',
            password: ''
        }
    });
    const mutation = useMutation({
        mutationFn: (values: z.infer<typeof RegisterFormSchema>): Promise<AxiosResponse<GenericResponse<UserDto>>> => {
            return axios.post('http://localhost:8080/api/v1/auth/register', values);
        },
        onSuccess: ({ data: { data: registeredUser } }) => {
            toast.success(`Welcome ${registeredUser?.firstName} 👋`);
        },
        onError: ({
            response: { data: { message } } = {} as AxiosResponse<GenericResponse<boolean>>
        }: AxiosError<GenericResponse<boolean>>) => {
            toast.error(message);
        }
    });
    const handleSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
        mutation.mutate(values);
    };

    return (
        <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <FormField
                        control={registerForm.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-1">
                                    <IdCard className="h-[1.75cap]" />
                                    <span>First Name</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="text-secondary-foreground"
                                        type="text"
                                        placeholder="Enter your first name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>Your firstname</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={registerForm.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-1">
                                    <IdCard className="h-[1.75cap]" />
                                    <span>Lastname</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="text-secondary-foreground"
                                        type="text"
                                        placeholder="Enter your lastname"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>Your lastname</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={registerForm.control}
                        name="ssn"
                        render={({ field }) => (
                            <FormItem className="col-span-full">
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
                </div>

                <FormField
                    control={registerForm.control}
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
                <Button type="submit">Register</Button>
            </form>
        </Form>
    );
}
