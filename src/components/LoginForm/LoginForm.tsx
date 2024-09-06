"use client";
import {IdCard} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import loginFormSchema from "@/components/LoginForm/LoginFormSchema";
import LoginFormSchema from "@/components/LoginForm/LoginFormSchema";
import {z} from "zod"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"

export default function LoginForm() {
    const loginForm = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(loginFormSchema)
    })

    const handleSubmit = () => {
        console.log('helllo')
    }

    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
                <FormField control={loginForm.control} name="ssn"
                           render={
                               ({field}) => (
                                   <FormItem>
                                       <FormLabel className="flex items-center gap-1">
                                           <IdCard className="h-[1.75cap]"/>
                                           <span>SSN</span>
                                       </FormLabel>
                                       <FormControl>
                                           <Input className="text-secondary-foreground"
                                                  type="number"
                                                  placeholder="Enter your ssn" {...field}/>
                                       </FormControl>
                                       <FormDescription>
                                           Your social security number
                                       </FormDescription>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                />

                <FormField control={loginForm.control} name="password"
                           render={
                               ({field}) => (
                                   <FormItem>
                                       <FormLabel className="flex items-center gap-1">
                                           <IdCard className="h-[1.75cap]"/>
                                           <span>Password</span>
                                       </FormLabel>
                                       <FormControl>
                                           <Input className="text-secondary-foreground"
                                                  placeholder="Enter your password" {...field}/>
                                       </FormControl>
                                       <FormDescription>
                                           Your Spring Bank password
                                       </FormDescription>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                />
                <Button type="submit">Login</Button>
            </form>
        </Form>
    )
}