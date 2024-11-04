"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { customIcons } from "@/components/ui/icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Simulating API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Here you would typically make an API call to update the password
      console.log("Password reset for user:", username)
      const response = await axios.post('/api/users/forgot', { username, password: newPassword });
      if(response.data.success){
      alert("Password reset successfully!")
      router.push('/signin');
      }else{
        alert("User not found")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter your username and new password
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="username">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Username"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="newPassword">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  placeholder="New Password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="confirmPassword">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm New Password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <Button disabled={isLoading}>
                {isLoading && (
                  <customIcons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Reset Password
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/signin"
              className="underline underline-offset-4 hover:text-primary"
            >
              Back to Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

// This component is used in the forgot password form above
const Icons = {
  spinner: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
}