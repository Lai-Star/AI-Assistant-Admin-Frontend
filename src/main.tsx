import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Dashboard from './components/Dashboard.tsx'
import Home from '@/components/Home.tsx'

import CompanyList from '@/pages/companies/CompanyList.tsx'
import CompanyAdd from '@/pages/companies/CompanyAdd.tsx'
import CompanyEdit from '@/pages/companies/CompanyEdit.tsx'

import Login from '@/pages/Login.tsx'
import Loading from './pages/Loading.tsx'

import ForgotPassword from '@/pages/ForgotPassword.tsx'
import ResetPassword from '@/pages/ResetPassword.tsx'

// import PrivateRoute from '@/PrivateRoute.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '/companies/list/',
        element: <CompanyList />
    },
    {
        path: '/companies/add/',
        element: <CompanyAdd />
    },
    {
        path: '/companies/edit/:id',
        element: <CompanyEdit />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/forgot',
        element: <ForgotPassword />
    },
    {
        path: '/reset-password/:token',
        element: <ResetPassword />
    },
    {
        path: '/loading',
        element: <Loading />
    }
    // TODO: Para garantir segurança nas rotas importante deixar privada e para isso descomentar o código
    // {
    //     path: "/",
    //     element: <PrivateRoute><App /></PrivateRoute>,
    //     // element: <App />,
    // },
    // {
    //     path: "/home",
    //     element: <PrivateRoute><Home /></PrivateRoute>,
    // },
    // {
    //     path: "/dashboard",
    //     element: <PrivateRoute><Dashboard /></PrivateRoute>,
    // },
    // {
    //     path: "/companies/list/",
    //     element: <PrivateRoute><CompanyList /></PrivateRoute>,
    // },
    // {
    //     path: "/companies/add/",
    //     element: <PrivateRoute><CompanyAdd /></PrivateRoute>,
    // },
    // {
    //     path: "/companies/edit/:id",
    //     element: <PrivateRoute><UserEdit /></PrivateRoute>,
    // },
    // {
    //     path: "/loading",
    //     element: <Loading />,
    // },
    // {
    //     path: "/login",
    //     element: <Login />,
    // },
    // {
    //     path: "/reset",
    //     element: <PasswordReset />,
    // }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
