import ApiService from './ApiService'

export async function apiGetCustomers<T>() {
    return ApiService.fetchData<T>({
        url: '/get-customers',
        method: 'get',
    })
}
export async function apPutCustomer<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/customers',
        method: 'put',
        data,
    })
}

export async function apiGetCustomerDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/user',
        method: 'get',
        params,
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
