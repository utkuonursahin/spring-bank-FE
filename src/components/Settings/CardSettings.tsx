'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CardDto } from '@/dto/CardDto';
import { toast } from 'sonner';

async function fetchCardData(): Promise<CardDto> {
    const response = await axios.get('http://localhost:8080/api/v1/cards/me', { withCredentials: true });
    return response.data;
}

export default function CardSettings() {
    const { data, isLoading, isError } = useQuery<CardDto>({
        queryKey: ['cardData'],
        queryFn: fetchCardData,
    });

    // Initialize state variables with default values
    const [cardLimit, setCardLimit] = useState<number>(5000); // Default value
    const [isInternetEnabled, setIsInternetEnabled] = useState<boolean>(false);
    const [isInternationalEnabled, setIsInternationalEnabled] = useState<boolean>(false);
    const [isContactlessEnabled, setIsContactlessEnabled] = useState<boolean>(false);

    // State for PIN change
    const [currentPin, setCurrentPin] = useState<string>('');
    const [newPin, setNewPin] = useState<string>('');

    // Update local state based on fetched data
    useEffect(() => {
        if (data) {
            setCardLimit(data.cardLimit);
            setIsInternetEnabled(data.isOpenToInternet);
            setIsInternationalEnabled(data.isOpenToInternationalTransactions);
            setIsContactlessEnabled(data.isOpenToContactlessPayments);
        }
    }, [data]);

    const handleUpdateSettings = async () => {
        try {
            await axios.put('http://localhost:8080/api/v1/cards/me', {
                id: data?.id, // Include the card ID if necessary
                cardLimit: cardLimit,
                isOpenToInternet: isInternetEnabled,
                isOpenToInternationalTransactions: isInternationalEnabled,
                isOpenToContactlessPayments: isContactlessEnabled,
            }, { withCredentials: true });
            toast.success("Settings updated successfully");
        } catch (error) {
            toast.error("Error updating settings");
        }
    };

    useEffect(() => {
        handleUpdateSettings();
    }, [isInternetEnabled, isInternationalEnabled, isContactlessEnabled]);

    // Separate handlers for each switch
    const handleInternetSwitchChange = () => {
        setIsInternetEnabled(s => !s);
    };

    const handleInternationalSwitchChange = () => {
        setIsInternationalEnabled(s => !s);
    };

    const handleContactlessSwitchChange = () => {
        setIsContactlessEnabled(s => !s);
    };

    // Handle PIN change
    const handleChangePin = async () => {
        try {
            await axios.put('http://localhost:8080/api/v1/cards/me/pin', {
                oldPin: currentPin,
                newPin: newPin,
            }, { withCredentials: true });
            toast.success("PIN changed successfully");
            // Reset the PIN fields after successful change
            setCurrentPin('');
            setNewPin('');
        } catch (error) {
            toast.error("Error changing PIN");
        }
    };

    if (isLoading) return <div>Loading card settings...</div>;
    if (isError) return <div>Error fetching card settings</div>;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Card Controls</CardTitle>
                <CardDescription>Manage your card security and spending limits</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6 w-full">
                    {/* Card Limit Settings */}
                    <div className="space-y-2 w-full">
                        <Label htmlFor="card-limit">Card Limit</Label>
                        <div className="flex space-x-2 w-full">
                            <Input 
                                type="number" 
                                id="card-limit" 
                                placeholder="Enter amount"
                                value={cardLimit}
                                onChange={(e) => setCardLimit(Number(e.target.value))}
                                className="flex-1"
                            />
                            <Button variant="secondary" onClick={handleUpdateSettings}>Update</Button>
                        </div>
                    </div>

                    {/* PIN Change */}
                    <div className="space-y-2 w-full">
                        <Label>Change Card PIN</Label>
                        <div className="flex space-x-2 w-full">
                            <Input 
                                type="password" 
                                placeholder="Current PIN" 
                                maxLength={4}
                                value={currentPin}
                                onChange={(e) => setCurrentPin(e.target.value)}
                                className="flex-1"
                            />
                            <Input 
                                type="password" 
                                placeholder="New PIN" 
                                maxLength={4}
                                value={newPin}
                                onChange={(e) => setNewPin(e.target.value)}
                                className="flex-1"
                            />
                            <Button variant="secondary" onClick={handleChangePin}>Change PIN</Button>
                        </div>
                    </div>

                    {/* Toggle Controls */}
                    <div className="space-y-4 w-full">
                        <div className="flex items-center justify-between w-full">
                            <div className="space-y-0.5">
                                <Label>Internet Purchases</Label>
                                <p className="text-sm text-muted-foreground">Enable or disable online transactions</p>
                            </div>
                            <Switch
                                checked={isInternetEnabled}
                                onCheckedChange={handleInternetSwitchChange}
                            />
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <div className="space-y-0.5">
                                <Label>International Transactions</Label>
                                <p className="text-sm text-muted-foreground">Allow transactions outside your country</p>
                            </div>
                            <Switch
                                checked={isInternationalEnabled}
                                onCheckedChange={handleInternationalSwitchChange}
                            />
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <div className="space-y-0.5">
                                <Label>Contactless Payments</Label>
                                <p className="text-sm text-muted-foreground">Enable tap-to-pay functionality</p>
                            </div>
                            <Switch
                                checked={isContactlessEnabled}
                                onCheckedChange={handleContactlessSwitchChange}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 