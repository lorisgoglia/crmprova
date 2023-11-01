import { createServer } from 'miragejs'
import appConfig from '@/configs/app.config'

import { signInUserData } from './data/authData'

import { authFakeApi } from './fakeApi'
import salesFakeApi from '@/mock/fakeApi/salesFakeApi'
import { salesDashboardData } from '@/mock/data/salesData'
import { userDetailData, usersData } from '@/mock/data/usersData'
import crmFakeApi from '@/mock/fakeApi/crmFakeApi'

const { apiPrefix } = appConfig

export function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,
                salesDashboardData,
                usersData,
                userDetailData,
            })
        },
        routes: function () {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough((request) => {
                const isExternal = request.url.startsWith('http')
                return isExternal
            })
            this.passthrough()

            authFakeApi(this, apiPrefix)
            salesFakeApi(this, apiPrefix)
            crmFakeApi(this, apiPrefix)
        },
    })
}
