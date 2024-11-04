import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Home, MessageCircle, User, PlusCircle, Heart, MessageSquare, Share2 } from "lucide-react"
import Link from "next/link"

export default function SocialMediaLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MessageCircle className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">SelfieBook</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#demo">
            Demo
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/signup">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connect, Share, Engage
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Experience a new way of social networking with SocialConnect. Share your moments, chat with friends, and build your online presence.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <Home className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Home Feed</CardTitle>
                  <CardDescription>Stay updated with posts from your network</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <MessageCircle className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Chat</CardTitle>
                  <CardDescription>Connect with friends through instant messaging</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <User className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Showcase your personality and achievements</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <PlusCircle className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Create Posts</CardTitle>
                  <CardDescription>Share your thoughts, photos, and more</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        <section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">See It in Action</h2>
            <div className="mx-auto max-w-3xl">
              <Tabs defaultValue="home" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="home">Home</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="post">Post</TabsTrigger>
                </TabsList>
                <TabsContent value="home">
                  <Card>
                    <CardHeader>
                      <CardTitle>Home Feed</CardTitle>
                      <CardDescription>Recent posts from your network</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                        </div>
                        <p>Just had an amazing day at the beach! 🏖️ #SummerVibes</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <Heart className="mr-2 h-4 w-4" />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Comment
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="chat">
                  <Card>
                    <CardHeader>
                      <CardTitle>Chat</CardTitle>
                      <CardDescription>Your conversations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder-avatar-2.jpg" alt="Avatar" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium">Jane Smith</p>
                            <p className="text-xs text-muted-foreground truncate">Hey, how&apos;s it going?</p>
                          </div>
                          <p className="text-xs text-muted-foreground">5m</p>
                        </div>
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder-avatar-3.jpg" alt="Avatar" />
                            <AvatarFallback>MJ</AvatarFallback>
                          </Avatar>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium">Mike Johnson</p>
                            <p className="text-xs text-muted-foreground truncate">Are we still on for lunch?</p>
                          </div>
                          <p className="text-xs text-muted-foreground">2h</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile</CardTitle>
                      <CardDescription>Your public profile</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold">John Doe</h3>
                          <p className="text-sm text-muted-foreground">@johndoe</p>
                        </div>
                      </div>
                      <p>Passionate photographer and travel enthusiast. Always looking for the next adventure!</p>
                      <div className="flex space-x-4">
                        <div>
                          <p className="text-xl font-bold">250</p>
                          <p className="text-sm text-muted-foreground">Posts</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold">10k</p>
                          <p className="text-sm text-muted-foreground">Followers</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold">500</p>
                          <p className="text-sm text-muted-foreground">Following</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="post">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create Post</CardTitle>
                      <CardDescription>Share your thoughts with the world</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="post-content" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            What&apos;s on your mind?
                            </label>
                            <Input id="post-content" placeholder="Write your post here..." />
                          </div>
                          <Button>Post</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Connect?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Join SelfieBook today and start sharing your world with others.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 SocialConnect. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}