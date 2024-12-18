'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from "sonner";
import { BanknoteIcon } from "lucide-react";
import { AccountDto } from "@/dto/AccountDto";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TransferDialogProps {
    fromAccount: AccountDto;
}

const fetchAccount = async (accountType: string) => {
    const response = await axios.get(`http://localhost:8080/api/v1/account/me/${accountType}`, {
        withCredentials: true
    });
    return response.data as AccountDto;
};

export function TransferDialog({ fromAccount }: TransferDialogProps) {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState<string>("");
    const [selectedAccountType, setSelectedAccountType] = useState<string>("");
    const queryClient = useQueryClient();

    const { data: destinationAccount } = useQuery({
        queryKey: ['account', selectedAccountType],
        queryFn: () => fetchAccount(selectedAccountType),
        enabled: !!selectedAccountType
    });

    const transferMutation = useMutation({
        mutationFn: async () => {
            if (!destinationAccount) throw new Error("Destination account not found");

            const response = await axios.post(
                'http://localhost:8080/api/v1/account/me/transfer',
                {
                    sender: {
                        id: fromAccount.id
                    },
                    receiver: {
                        id: destinationAccount.id
                    },
                    amount: Number(amount)
                },
                { withCredentials: true }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account'] });
            toast.success("Money transferred successfully");
            setOpen(false);
            resetForm();
        },
        onError: (error) => {
            toast.error("Failed to transfer money");
            console.error("Transfer error:", error);
        }
    });

    const resetForm = () => {
        setAmount("");
        setSelectedAccountType("");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2"
                >
                    <BanknoteIcon className="h-4 w-4" />
                    <span>Transfer Cash</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Transfer Money</DialogTitle>
                    <DialogDescription>
                        Transfer from {fromAccount.accountType}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between text-sm">
                            <span>Available Balance:</span>
                            <span className="font-medium">
                                ${fromAccount.cash?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>To Account</Label>
                        <Select value={selectedAccountType} onValueChange={setSelectedAccountType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select destination account" />
                            </SelectTrigger>
                            <SelectContent>
                                {fromAccount.accountType !== 'CURRENT' && (
                                    <SelectItem value="CURRENT">Current Account</SelectItem>
                                )}
                                {fromAccount.accountType !== 'SAVINGS' && (
                                    <SelectItem value="SAVINGS">Savings Account</SelectItem>
                                )}
                                {fromAccount.accountType !== 'FIXED_DEPOSIT' && (
                                    <SelectItem value="FIXED_DEPOSIT">Fixed Deposit</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount to Transfer</Label>
                        <Input 
                            id="amount" 
                            type="number" 
                            min="0.01"
                            step="0.01"
                            max={fromAccount.cash}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button 
                        onClick={() => transferMutation.mutate()}
                        disabled={transferMutation.isPending}
                    >
                        {transferMutation.isPending ? "Transferring..." : "Transfer"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 