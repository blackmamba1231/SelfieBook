"use client"
import React  from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Heart, Bookmark, ArrowLeft } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect , useState } from "react"
import Image from 'next/image'


// Mock user data



export default function ProfilePage() {
  type Post = {
    id: string;
    content: string;
    image: string;
    likes: number;
    comments: string[];
    // add other fields as needed
  };
  
  const [uniqueID, setUniqueID] = useState<string>(""); // Unique identifier as a string
  const [avatar, setAvatar] = useState<string>(""); // Avatar URL as a string
  const [bio, setBio] = useState<string>(""); // Bio text as a string
  const [followers, setFollowers] = useState<number>(0); // Followers count as a number
  const [following, setFollowing] = useState<number>(0); // Following count as a number
  const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter();
    async function getUser() {
        const response = await axios.post("/api/users/profile", { userId: localStorage.getItem("userId") });
        console.log(response.data);
        setUniqueID(response.data.user.uniqueId);
        setAvatar(response.data.user.avatar);
        setBio(response.data.user.bio);
        if(response.data.user.followers === undefined) {
        setFollowers(0);
        }
        if(response.data.user.following === undefined) {
        setFollowing(0);
        }
        
    }
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            getUser();
        }, 5000); 
        return () => clearTimeout(timeoutId);
    }, [])
    async function getPosts() {
        const response = await axios.post("/api/users/posts", { userId: localStorage.getItem("userId") });
        console.log(response.data);
        setPosts(response.data.posts);
        
    }
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            getPosts();
        }, 500000); 
        return () => clearTimeout(timeoutId);
    }, [])
    const user = {
        username: uniqueID,
        avatar: avatar,
        bio: bio,
        followers: followers,
        following: following,
        posts: posts
      }
  return (
    <div className="min-h-screen px-28 py-10 bg-gray-100">
      <div>
        <Card>
        <div className="flex flex-col items-center mb-8">
        <div className='absolute left-28'>
        <Button
    variant="ghost"
    onClick={()=> {
        router.push('/home');
    }}
    className="p-0 hover:bg-transparent " 
  >
    <ArrowLeft className="mr-2 h-4 w-4  " />
  </Button>
        </div>
        <Avatar className="w-32 h-32 mb-4 ">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user?.username ? user.username[0].toUpperCase() : ""}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-4">{user.bio}</p>
        <div className="flex space-x-4 mb-4">
          <div className="text-center">
            <p className="font-bold">{user.followers}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.following}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
          </div>
        </div>
        <Button className='bg-lime-500 hover:bg-lime-300 text-white' onClick={() => router.push("/update-profile")}>Edit Profile</Button>
      </div>
        </Card>
      </div>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-4">
            {user.posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <Image src={post.image} alt={`Post ${post.id}`} className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent className="p-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved">
          <div className="text-center py-8">
            <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">Only you can see what you have saved</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}