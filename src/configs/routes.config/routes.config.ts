import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/features/customers/Customers')),
        authority: [],
    },
    {
        key: 'customer',
        path: '/customer/new',
        component: lazy(() => import('@/features/customer-form/KycForm')),
        authority: [],
    },
]
