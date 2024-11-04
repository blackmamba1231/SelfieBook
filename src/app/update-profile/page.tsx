"use client"
import React, { useState, ChangeEvent, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import  Textarea  from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ArrowLeft } from "lucide-react"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary';

export default function UpdateProfilePage() {
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarURL, setAvatarURL] = useState<string | null>(null)
  const [uniqueID, setUniqueID] = useState<string>("")
  const [bio, setBio] = useState<string>("")
  const router = useRouter();
  useEffect(() => {
    getUserData()
  }, [])

  async function getUserData() {
    const response = await axios.post("/api/users/profile", { userId: localStorage.getItem("userId") })

    console.log(response.data)
    setUniqueID(response.data.user.uniqueId)
    setAvatarURL(response.data.user.avatar)
    setBio(response.data.user.bio)
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let uploadedAvatarUrl = avatarURL
    if (avatarFile) {
      const base64Avatar = await toBase64(avatarFile)
      const uploadResponse = await axios.post('/api/users/upload-avatar', { file: base64Avatar })
      uploadedAvatarUrl = uploadResponse.data.url
    }

    const updateresponse = await axios.post('/api/users/update-profile', {
      userId: localStorage.getItem("userId"),
      uniqueId: uniqueID,
      avatar: uploadedAvatarUrl,
      bio: bio,
    })
    console.log('Updating user:', uniqueID, uploadedAvatarUrl, bio)
    console.log(updateresponse.data)
    if(updateresponse.data.success){
        router.push('/profile');
    }else{
        alert(updateresponse.data.message);
    }

    
  }

  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
        <Button
    variant="ghost"
    onClick={()=> {
        router.push('/profile');
    }}
    className="p-0 hover:bg-transparent"
  >
    <ArrowLeft className="mr-2 h-4 w-4" />
    Back
  </Button>
          <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4 bg-slate-200">
                  <AvatarImage src={avatarPreview || undefined} alt={uniqueID} />
                  <AvatarFallback>{uniqueID?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="flex items-center space-x-2 bg-slate-700 text-primary-foreground hover:bg-slate-500 h-10 px-4 py-2 rounded-md">
                    <Upload className="text-white w-4 h-4" />
                    <span className='text-white'>Upload new avatar</span>
                  </div>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={uniqueID || ""}
                  onChange={(e) => setUniqueID(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  className='w-full px-4 py-2 bg-slate-100'
                  value={bio || ""}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="bg-slate-700 text-white w-full hover:bg-slate-500">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
