import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useState } from "react"
import { useMutation } from '@tanstack/react-query';
import axios from "axios"

const updatePassword = async (data: { oldPassword: string; newPassword: string }) => {
    const response = await axios.put("http://localhost:8080/api/v1/user/me/password", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    return response.data
  }

const PasswordUpdateForm = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password updated successfully")
      // Optionally reset the form or redirect
    },
    onError: () => {
      toast.error("Failed to update password")
    },
  })

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPassword || !confirmPassword) {
      toast.error("New password and confirm password cannot be empty")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match")
      return
    }

    mutation.mutate({ oldPassword: currentPassword, newPassword })
  }

  return (
    <form onSubmit={handlePasswordUpdate} className="space-y-4 w-full">
      <div className="space-y-2 w-full">
        <Label htmlFor="current-password">Current Password</Label>
        <Input
          className="w-full"
          type="password"
          id="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="space-y-2 w-full">
        <Label htmlFor="new-password">New Password</Label>
        <Input
          className="w-full"
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="space-y-2 w-full">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input
          className="w-full"
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Update Password
      </Button>
    </form>
  )
}

export default PasswordUpdateForm 