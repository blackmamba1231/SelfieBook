"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageCircle, User, LogOut, Sun, Moon, Search, House, Bell, Bookmark } from "lucide-react"

export default function ResponsivePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleLogout = () => {
    
    console.log("Logging out...")
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="sticky top-0 z-10 bg-white dark:bg-slate-800 shadow-sm">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <p className="text-lg font-bold text-lime-500">SelfieBook</p>
                <div className="relative w-full sm:w-64">
                  <Input 
                    placeholder="Search" 
                    className="dark:bg-white text-xs h-8 w-full bg-slate-100 rounded-xl shadow-md pr-8"
                  />
                  <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <MessageCircle className="w-5 h-5" />
                  <span className="sr-only">Messages</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Profile</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700" onSelect={() => router.push('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700" onSelect={toggleDarkMode}>
                      {isDarkMode ? (
                        <>
                          <Sun className="mr-2 h-4 w-4" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="mr-2 h-4 w-4" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700' onSelect={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> 
              </div>
            </div>
          </div>
        </header>
        <main className='container mx-auto py-3 px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='md:sticky md:top-20 h-auto md:h-48 py-4'>
              <Card className='text-black h-full rounded-lg p-4 w-full md:w-2/3 grid grid-cols-1 gap-1'>
                <Button 
                  className='w-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-zinc-950 dark:text-white flex justify-start items-center space-x-2'
                  onClick={() => router.push('/home')}
                >
                  <House className='w-5 h-5' />
                  <span>Home</span>
                </Button>
                <Button 
                  className='w-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-zinc-950 dark:text-white flex justify-start items-center space-x-2'
                >
                  <Bell className='w-5 h-5' />
                  <span>Notifications</span>
                </Button>
                <Button 
                  className='w-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-zinc-950 dark:text-white flex justify-start items-center space-x-2'
                >
                  <Bookmark className='w-5 h-5' />
                  <span>Bookmarks</span>
                </Button>
              </Card>
            </div>
            <div className='col-span-1 md:col-span-2'>
              {/* Main content area */}
              <Card className='p-4'>
                <h2 className='text-xl font-bold mb-4'>Main Content</h2>
                <p>Your main content goes here...</p>
              </Card>
            </div>
            <div className='md:sticky md:top-20 h-auto md:h-40 py-4'>
              <Card className='w-full md:w-2/3 p-4'>
                <h5 className='font-semibold mb-2'>Suggestions</h5>
                {/* Add your suggestions content here */}
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}