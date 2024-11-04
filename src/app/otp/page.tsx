"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

import axios from "axios"

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setOtp(value)
    if (value.length === 6) {
      setError(null)
    }
  }
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP")
      return
    }
    setIsLoading(true)
    setError(null)

    // Simulating API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const username = localStorage.getItem("username");
      console.log(username)
       const response = await axios.post("/api/users/otp-verify", { username, otp })   
      if (response.data.success) {
        alert("OTP verified successfully!")
        localStorage.setItem('token', response.data.token);
        router.push("/home")
      } else {
        setError("Invalid OTP. Please try again.")
      }
    } catch (_error) {
      console.log(_error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
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
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">OTP Verification</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="otp">
                  One-Time Password
                </Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                />
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
              </div>
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Verify OTP
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="px-8 text-center text-sm text-muted-foreground">
           Didn&apos;t receive the code?{" "}
            <button
              className="underline underline-offset-4 hover:text-primary"
              onClick={async () => {
                const response = await axios.post("/api/users/resend-otp", {
                  username: localStorage.getItem("username"),
                })
                if(response.data.success){
                  alert("OTP sent successfully!");
                }else{
                  alert("User not found");
                }
              }}
            >
              Resend OTP
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

// This component is used in the OTP verification form above
