import ApiService from './ApiService'
import { Card, Movement } from '@/services/models/users'

type GetMovementResponse = {
    card: Card
    movements: Movement[]
}

export async function apiGetCustomers<T>() {
    return ApiService.fetchData<T>({
        url: '/get-customers',
        method: 'get',
    })
}
export async function apiPutCustomer<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/update-customer/',
        method: 'patch',
        data,
    })
}
export async function apiDeleteCustomer<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/customer',
        method: 'delete',
        data,
    })
}

export async function apiGetMovements<U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<GetMovementResponse>({
        url: `/movements/${data.user_id}/${data.start_date}/${data.end_date}`,
        method: 'get',
    })
}

export async function apiChargeCard<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/add-manual-movement/',
        method: 'post',
        data,
    })
}
