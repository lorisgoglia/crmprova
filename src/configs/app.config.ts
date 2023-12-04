export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    dateFormat: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'http://165.22.93.68:8000/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'it',
    dateFormat: 'L',
    enableMock: false,
}

const appConfigDemo: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'it',
    dateFormat: 'L',
    enableMock: true,
}

export default appConfig
