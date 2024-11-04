'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Card } from "@/components/ui/card"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageCircle, User, Bookmark, Moon, Sun, LogOut, Search } from "lucide-react"
import { useRouter } from 'next/navigation'
import { House } from 'lucide-react';
import { Bell } from 'lucide-react';

import axios from 'axios'

export default function Home() {
  
    const [isDarkMode, setIsDarkMode] = useState(false)
    const router = useRouter(); 
    const handleLogout = async ()=> {
        const response = await axios.get('/api/users/logout')
        console.log(response);
        router.push('/signin')
    }
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.remove('dark')
          } else {
            document.documentElement.classList.add('dark')
          }
    };
    
    return (
        <div>
        <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <header className="sticky top-0 z-10 bg-white p-4 dark:bg-slate-800 shadow-sm">
              <div className="grid w-full grid-cols-3">
                <div className="flex items-center justify-end space-x-4 space-y-0">
                  <div className="flex items-center ">
                    <p className="text-lg font-bold text-lime-500 ">SelfieBook</p>
                  </div>
                  <div className="relative w-5/12">
                                    <Input 
                                        placeholder="Search" 
                                        className="dark:bg-white text-xs h-8 w-full bg-slate-100 rounded-xl  shadow-md"
                                    />
                                    <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                </div>
                </div>
                <div className="flex items-center justify-end space-x-4 space-y-0">
                </div>
                <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                        <MessageCircle className="w-5 h-5"></MessageCircle>
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
                  <DropdownMenuItem className="cursor-pointer hover:bg-slate-100" onSelect={() => {
                    router.push('/profile')
                  }}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-slate-100" onSelect={toggleDarkMode}>
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
                  <DropdownMenuItem className='cursor-pointer hover:bg-slate-100' onSelect={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                 </DropdownMenuContent>
                </DropdownMenu> 
                </div>
              </div>
            </header>
            <main className='container mx-auto py-3'>
                <div className='grid w-full grid-cols-3'>
                    <div className='sticky h-48 py-4 flex justify-end -translate-x-6'>
                         <Card className='relative h-full rounded-full p-4  w-2/3 grid grid-rows-3 '>
                                <div className='relative'>
                                <House className='w-5 h-5 top-1/2 absolute left-1/2 transform -translate-x-28 -translate-y-1/2 '></House>
                                <Button className='w-full h-full bg-white rounded-sm hover:bg-slate-100  text-black '
                                onClick={() => router.push('/home')}
                                >
                                    <p className='-translate-x-14 text-sm'>Home</p>
                                </Button>
                                </div>
                                <div className='relative '>
                                <Bell className='w-5 h-5 top-1/2 absolute left-1/2 transform -translate-x-28 -translate-y-1/2 '></Bell>
                                <Button className='w-full h-full bg-white rounded-sm hover:bg-slate-100  text-black'>
                                <p className='-translate-x-9 text-sm'>Notifications</p>
                                </Button>
                                </div>
                               <div className='relative'>
                               <Bookmark className='w-5 h-5 top-1/2 absolute left-1/2 transform -translate-x-28 -translate-y-1/2 '></Bookmark>
                                <Button className='w-full h-full bg-white rounded-sm hover:bg-slate-100  text-black'>
                                <p className='-translate-x-10 text-sm'>Bookmarks</p>
                                </Button>
                               </div>  
                         </Card>
                    </div>
                    <div>

                    </div>
                    <div className='sticky h-40 w-full py-4 flex justify-start'>
                        <Card className='w-2/3'>
                            <h5>suggestions</h5>
                        </Card>
                    </div>
                </div>

            </main>
          </div>
        </div>
      </div>
      
    );
}