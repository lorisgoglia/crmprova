import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/features/dashboard/Dashboard')),
        authority: [],
    },
    {
        key: 'customers',
        path: '/customers',
        component: lazy(() => import('@/features/customer/Customer')),
        authority: [],
    },
]
