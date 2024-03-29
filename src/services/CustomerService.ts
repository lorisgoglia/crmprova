import ApiService from './ApiService'
import { Card, ClinicalInformation, Movement } from '@/services/models/users'

type GetMovementResponse = {
    card: Card
    movements: Movement[]
}

type GetClinicalInfoResponse = ClinicalInformation

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

export async function apiGetClinicalinfo<U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<GetClinicalInfoResponse>({
        url: `/get-clinical-information/${data.user_id}/`,
        method: 'get',
    })
}

export async function apiManageClinicalInfo<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/manage-clinical-information/',
        method: 'post',
        data,
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
