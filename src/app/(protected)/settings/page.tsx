"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useState } from "react"
import CardSettings from "@/components/Settings/CardSettings"
import PasswordUpdateForm from "@/components/Settings/PasswordUpdateForm"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

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
            <PasswordUpdateForm />
          </CardContent>
        </Card>

        {/* Card Settings */}
        <CardSettings />
      </div>
    </div>
  )
}
