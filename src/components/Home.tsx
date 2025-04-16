import React, { useEffect, useState } from 'react';
import Layout from '@/layouts/Layout.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import logo2 from '@/assets/icons/01_welcome.png';
import TitleComponent from '@/components/TitleComponent';
import { useNavigate } from 'react-router-dom';

// Interface for the user object
interface User {
    name: string;
    [key: string]: any; // Allows for any additional properties you need to add
}

const Home: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<string>('') // Current date as string
    const [user, setUser] = useState<User | null>(null) // User state can be of type User or null
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        const userData = localStorage.getItem('user')

        if (!accessToken) {
            navigate('/login')
        } else {
            setUser(JSON.parse(userData || '{}')) // Parsing userData to set user
        }
    }, [navigate])

    if (!user) {
        return <div>Loading...</div>
    }

    // Create formatted date
    const date = new Date()
    const day = new Intl.DateTimeFormat('pt-BR', { day: 'numeric' }).format(date)
    const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date)
    const year = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(date)
    const formattedDate = `${day}, ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`

    return (
        <Layout>
            <TitleComponent>Home</TitleComponent>
            <div className="p-4">
                <Card className="card-height">
                    <CardHeader>
                        <CardTitle className="font-bold text-2xl">Hello {user.name}!</CardTitle>
                        <CardDescription>{formattedDate}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="hidden lg:flex items-center justify-center w-full p-4">
                            <img src={logo2} alt="Logo" className="max-w-full h-[350px]" />
                        </div>
                        <div className="flex justify-center border-solid items-center">
                            <h1 className="buttonWelcome py-4 px-36 text-2xl font-bold">Welcome!</h1>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    )
}

export default Home