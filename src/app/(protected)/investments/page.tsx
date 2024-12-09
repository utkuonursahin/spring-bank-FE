'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const mockData = [
    { month: 'Jan', value: 10000 },
    { month: 'Feb', value: 10800 },
    { month: 'Mar', value: 10600 },
    { month: 'Apr', value: 11200 },
    { month: 'May', value: 11800 },
    { month: 'Jun', value: 12400 }
];

const portfolioItems = [
    { name: 'AAPL', value: 15420.5, change: 2.4, shares: 25 },
    { name: 'GOOGL', value: 22150.75, change: -1.2, shares: 10 },
    { name: 'MSFT', value: 18320.25, change: 1.8, shares: 30 },
    { name: 'AMZN', value: 12840.6, change: -0.5, shares: 15 }
];

function BuyStockDialog() {
    return (
        <Dialog>
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
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a stock" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="AAPL">Apple (AAPL)</SelectItem>
                                <SelectItem value="GOOGL">Google (GOOGL)</SelectItem>
                                <SelectItem value="MSFT">Microsoft (MSFT)</SelectItem>
                                <SelectItem value="AMZN">Amazon (AMZN)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="shares">Number of Shares</Label>
                        <Input 
                            id="shares" 
                            type="number" 
                            min="1"
                            placeholder="Enter number of shares"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Estimated Cost</Label>
                        <div className="text-lg font-semibold">$0.00</div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Confirm Purchase
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function SellStockDialog() {
    return (
        <Dialog>
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
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a stock" />
                            </SelectTrigger>
                            <SelectContent>
                                {portfolioItems.map(item => (
                                    <SelectItem key={item.name} value={item.name}>
                                        {item.name} ({item.shares} shares)
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
                            placeholder="Enter number of shares"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Estimated Value</Label>
                        <div className="text-lg font-semibold">$0.00</div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Confirm Sale
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function InvestmentsPage() {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-2xl font-bold">Investments</h1>
            
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-lg">Portfolio Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-lg">Portfolio Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Total Value</span>
                                <span className="text-lg font-bold">$68,732.10</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Today's Change</span>
                                <span className="text-green-600">+$1,245.30 (1.8%)</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Holdings</CardTitle>
                        <div className="flex gap-4">
                            <BuyStockDialog />
                            <SellStockDialog />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {portfolioItems.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between p-2 hover:bg-muted rounded-lg"
                                >
                                    <div>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-sm text-muted-foreground">{item.shares} shares</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">${item.value.toLocaleString()}</div>
                                        <div
                                            className={`text-sm flex items-center ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}
                                        >
                                            {item.change >= 0 ? (
                                                <ArrowUpRight className="h-4 w-4 mr-1" />
                                            ) : (
                                                <ArrowDownRight className="h-4 w-4 mr-1" />
                                            )}
                                            {Math.abs(item.change)}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
