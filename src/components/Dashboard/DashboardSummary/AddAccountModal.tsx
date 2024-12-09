'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AccountDto } from '@/dto/AccountDto';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GenericResponse } from '@/dto/GenericResponse';

export default function AddAccountModal() {
    const [accountType, setAccountType] = useState<string>('');

    const mutation = useMutation({
        mutationFn: (accountInfo: AccountDto): Promise<AxiosResponse<GenericResponse<AccountDto>>> => {
            return axios.post('http://localhost:8080/api/v1/account/me', accountInfo, { withCredentials: true });
        },
        onSuccess: ({ data: { data: accountDto } }) => {
            toast.success(`${accountDto.accountType} Account created successfully!`);
        },
        onError: ({
            response: {
                data: {
                    error: { reason }
                }
            } = {} as AxiosResponse<GenericResponse<boolean>>
        }: AxiosError<GenericResponse<boolean>>) => {
            toast.error(reason);
        }
    });

    const handleCreateAccount = () => {
        const accountDto: AccountDto = {
            accountType
        };
        mutation.mutate(accountDto);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="w-full flex items-center justify-center cursor-pointer hover:bg-accent transition-colors">
                    <Plus className="h-12 w-12 text-muted-foreground" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Account</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <label htmlFor="account-type" className="block text-sm font-medium">
                            Select Account Type
                        </label>
                        <Select onValueChange={setAccountType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an account type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CURRENT">Current Account</SelectItem>
                                <SelectItem value="SAVINGS">Savings Account</SelectItem>
                                <SelectItem value="FIXED_DEPOSIT">Fixed Deposit</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setAccountType('')}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreateAccount} disabled={!accountType}>
                        Create Account
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
