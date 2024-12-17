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
import { StockDto } from "@/dto/StockDto";
import { toast } from "sonner";

const fetchPublicStocks = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/stock/public', {
        withCredentials: true
    });
    return response.data as StockDto[];
};

export function BuyStockDialog() {
    const [open, setOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const queryClient = useQueryClient();

    const { data: stocks, isLoading } = useQuery({
        queryKey: ['publicStocks'],
        queryFn: fetchPublicStocks
    });

    const buyMutation = useMutation({
        mutationFn: async () => {
            const stock = stocks?.find(s => s.id === selectedStock);
            if (!stock) throw new Error("Stock not found");

            const response = await axios.post(
                'http://localhost:8080/api/v1/account-stock/me',
                {
                    stock: {
                        id: stock.id,
                        stockCode: stock.stockCode,
                        stockName: stock.stockName
                    },
                    quantity: Number(quantity),
                },
                { withCredentials: true }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accountStocks'] });
            toast.success("Stock purchased successfully");
            setOpen(false);
            resetForm();
        },
        onError: (error) => {
            toast.error("Failed to purchase stock");
            console.error("Purchase error:", error);
        }
    });

    const resetForm = () => {
        setSelectedStock("");
        setQuantity("");
    };

    const handlePurchase = () => {
        if (!selectedStock || !quantity) {
            toast.error("Please fill in all fields");
            return;
        }
        buyMutation.mutate();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                >
                    Buy
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Buy Stock</DialogTitle>
                    <DialogDescription>
                        Enter the details to purchase stocks
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
                                {stocks?.map(stock => (
                                    <SelectItem key={stock.id} value={stock.id}>
                                        {stock.stockCode} - {stock.stockName}
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
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Enter number of shares"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={handlePurchase}
                        disabled={buyMutation.isPending}
                    >
                        {buyMutation.isPending ? "Purchasing..." : "Confirm Purchase"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 