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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AccountStockDto } from '@/dto/AccountStockDto';
import { toast } from "sonner";

const fetchUserStocks = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/account-stock/me', {
        withCredentials: true
    });
    return response.data as AccountStockDto[];
};

export function SellStockDialog() {
    const [open, setOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const queryClient = useQueryClient();

    const { data: userStocks, isLoading } = useQuery({
        queryKey: ['accountStocks'],
        queryFn: fetchUserStocks
    });

    const sellMutation = useMutation({
        mutationFn: async () => {
            const stock = userStocks?.find(s => s.id === selectedStock);
            if (!stock) throw new Error("Stock not found");

            const response = await axios.delete(
                'http://localhost:8080/api/v1/account-stock/me',
                { 
                    data: {
                        id: stock.id,
                        account: stock.account,
                        stock: stock.stock,
                        quantity: Number(quantity)
                    },
                    withCredentials: true 
                }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accountStocks'] });
            toast.success("Stock sold successfully");
            setOpen(false);
            resetForm();
        },
        onError: (error) => {
            toast.error("Failed to sell stock");
            console.error("Sell error:", error);
        }
    });

    const resetForm = () => {
        setSelectedStock("");
        setQuantity("");
    };

    const handleSell = () => {
        if (!selectedStock || !quantity) {
            toast.error("Please fill in all fields");
            return;
        }

        const stock = userStocks?.find(s => s.id === selectedStock);
        if (stock && Number(quantity) > stock.quantity) {
            toast.error("Cannot sell more shares than you own");
            return;
        }

        sellMutation.mutate();
    };

    const selectedStockData = userStocks?.find(s => s.id === selectedStock);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    size="sm"
                >
                    Sell
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sell Stock</DialogTitle>
                    <DialogDescription>
                        Enter the details to sell stocks
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="stock">Select Stock</Label>
                        <Select 
                            disabled={isLoading} 
                            value={selectedStock}
                            onValueChange={setSelectedStock}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={isLoading ? "Loading stocks..." : "Select a stock"} />
                            </SelectTrigger>
                            <SelectContent>
                                {userStocks?.map(stock => (
                                    <SelectItem key={stock.id} value={stock.id}>
                                        {stock.stock.stockCode} ({stock.quantity} shares at ${(stock.value / stock.quantity).toFixed(2)}/share)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="shares">Number of Shares</Label>
                        <Input 
                            id="shares" 
                            type="number" 
                            min="1"
                            max={selectedStockData?.quantity}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Enter number of shares"
                        />
                        {selectedStockData && (
                            <p className="text-sm text-muted-foreground">
                                Max: {selectedStockData.quantity} shares
                            </p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button 
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={handleSell}
                        disabled={sellMutation.isPending}
                    >
                        {sellMutation.isPending ? "Selling..." : "Confirm Sale"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 