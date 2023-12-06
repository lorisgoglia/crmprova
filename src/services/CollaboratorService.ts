import ApiService from './ApiService'

export async function apiGetCollaborators<T>() {
    return ApiService.fetchData<T>({
        url: '/get-collaborators/',
        method: 'get',
    })
}
export async function apiPutCollaborator<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/update-collaborator/',
        method: 'patch',
        data,
    })
}

export async function apiDeleteCollaborator<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/customer',
        method: 'delete',
        data,
    })
}
