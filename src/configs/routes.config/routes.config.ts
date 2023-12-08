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
        key: 'collaborators',
        path: '/collaborators',
        component: lazy(() => import('@/features/collaborators/Collaborators')),
        authority: [],
    },
    {
        key: 'collaborator',
        path: '/collaborator',
        component: lazy(
            () => import('@/features/new-collaborator-form/CollaboratorForm')
        ),
        authority: [],
    },
    {
        key: 'customer',
        path: '/customer/',
        component: lazy(() => import('@/features/new-customer-form/KycForm')),
        authority: [],
    },
    {
        key: 'print',
        path: '/print',
        component: lazy(
            () =>
                import(
                    '@/features/new-customer-form/components/RegistrationPrint'
                )
        ),
        authority: [],
        meta: {
            layout: 'blank',
        },
    },
]
