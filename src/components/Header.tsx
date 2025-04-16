import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback } from './ui/avatar.tsx'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from './ui/dropdown-menu.tsx'
import { ArrowBigLeftDash } from 'lucide-react'
export default function Header() {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
        if (storedUser && storedUser.name && storedUser.email) {
            setUser(storedUser)
        }
    }, [])
    const getUserInitials = (name: string) => {
        const nameParts = name.split(' ')
        if (nameParts.length > 1) {
            return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
        }
        return name[0].toUpperCase()
    }

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <div className="bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between">
            <div className="relative"></div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <Avatar className="w-10 h-10">
                            <AvatarFallback className="text-white bg-black">
                                {user ? getUserInitials(user.name) : 'NA'}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <div className="px-4 py-2 flex flex-row">
                        <Avatar className="w-10 h-10">
                            <AvatarFallback className="border-b-cyan-500 text-white bg-black">
                                {user ? getUserInitials(user.name) : 'NA'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="ml-2">
                            <p className="font-semibold">{user?.name}</p>
                            <p className="text-sm text-gray-600">{user?.email}</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <ArrowBigLeftDash />
                        <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
