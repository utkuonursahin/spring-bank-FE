"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isInternetEnabled, setIsInternetEnabled] = useState(false)
  const [isInternationalEnabled, setIsInternationalEnabled] = useState(false)
  const [isContactlessEnabled, setIsContactlessEnabled] = useState(false)

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Add your password update logic here
      toast.success("Password updated successfully")
    } catch (error) {
      toast.error("Failed to update password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Password Settings */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordUpdate} className="space-y-4 w-full">
              <div className="space-y-2 w-full">
                <Label htmlFor="current-password">Current Password</Label>
                <Input className="w-full" type="password" id="current-password" />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="new-password">New Password</Label>
                <Input className="w-full" type="password" id="new-password" />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input className="w-full" type="password" id="confirm-password" />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Card Settings */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Card Controls</CardTitle>
            <CardDescription>Manage your card security and spending limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 w-full">
              {/* Card Limit Settings */}
              <div className="space-y-2 w-full">
                <Label htmlFor="card-limit">Daily Transaction Limit</Label>
                <div className="flex space-x-2 w-full">
                  <Input 
                    type="number" 
                    id="card-limit" 
                    placeholder="Enter amount"
                    defaultValue="5000"
                    className="flex-1"
                  />
                  <Button variant="secondary">Update</Button>
                </div>
              </div>

              {/* PIN Change */}
              <div className="space-y-2 w-full">
                <Label>Card PIN</Label>
                <div className="flex space-x-2 w-full">
                  <Input 
                    type="password" 
                    placeholder="Current PIN" 
                    maxLength={4}
                    className="flex-1"
                  />
                  <Input 
                    type="password" 
                    placeholder="New PIN" 
                    maxLength={4}
                    className="flex-1"
                  />
                  <Button variant="secondary">Change PIN</Button>
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
                    onCheckedChange={setIsInternetEnabled}
                  />
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="space-y-0.5">
                    <Label>International Transactions</Label>
                    <p className="text-sm text-muted-foreground">Allow transactions outside your country</p>
                  </div>
                  <Switch
                    checked={isInternationalEnabled}
                    onCheckedChange={setIsInternationalEnabled}
                  />
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="space-y-0.5">
                    <Label>Contactless Payments</Label>
                    <p className="text-sm text-muted-foreground">Enable tap-to-pay functionality</p>
                  </div>
                  <Switch
                    checked={isContactlessEnabled}
                    onCheckedChange={setIsContactlessEnabled}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
