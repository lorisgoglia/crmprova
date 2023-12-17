import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCrmCustomersStatistic } from '@/services/CrmService'
import type { TableQueries } from '@/@types/common'
import paginate from '@/utils/paginate'
import { apiGetCustomers, apiPutCustomer } from '@/services/CustomerService'
import { UserData } from '@/services/models/users'

type Statistic = {
    value: number
    growShrink: number
}

type CustomerStatistic = {
    totalCustomers: Statistic
    activeCustomers: Statistic
    newCustomers: Statistic
}

type Filter = {
    status: string
}

type GetCrmCustomersStatisticResponse = CustomerStatistic

export type CustomersState = {
    loading: boolean
    statisticLoading: boolean
    customerList: UserData[]
    statisticData: Partial<CustomerStatistic>
    tableData: TableQueries
    filterData: Filter
    drawerOpen: boolean
    selectedCustomer: UserData | object
}

export const SLICE_NAME = 'customers'
export const getCustomers = createAsyncThunk(
    'get-customers/',
    async (data: TableQueries & { filterData?: Filter }) => {
        const response = await apiGetCustomers<UserData[]>()
        if (data.query)
            return response.data.filter((c) =>
                (c.user.first_name + ' ' + c.user.last_name).includes(
                    data.query!
                )
            )

        return response.data
    }
)

export const refreshCustomers = createAsyncThunk(
    'crmCustomers/data/refreshCustomers',
    async () => {
        const response = await apiGetCustomers<UserData[]>()
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmCustomers/data/putCustomer',
    async (data: Partial<UserData>) => {
        const update = await apiPutCustomer(data)
        const response = await apiGetCustomers<UserData[]>()
        return response.data
    }
)

export const getCustomerStatistic = createAsyncThunk(
    'crmCustomers/data/getCustomerStatistic',
    async () => {
        const response =
            await apiGetCrmCustomersStatistic<GetCrmCustomersStatisticResponse>()
        return response.data
    }
)

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    status: '',
}

const initialState: CustomersState = {
    loading: false,
    statisticLoading: false,
    customerList: [],
    statisticData: {},
    tableData: initialTableData,
    filterData: initialFilterData,
    drawerOpen: false,
    selectedCustomer: {},
}

const customersSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        },
        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },
        setDrawerClose: (state) => {
            state.drawerOpen = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomers.fulfilled, (state, action) => {
                const paginatedData = paginate(
                    action.payload,
                    action.payload.length,
                    1
                )
                state.customerList = paginatedData
                state.tableData.total = action.payload.length
                state.tableData.pageSize = action.payload.length
                state.loading = false
            })
            .addCase(getCustomers.pending, (state) => {
                state.loading = true
            })
            .addCase(putCustomer.fulfilled, (state, action) => {
                const paginatedData = paginate(
                    action.payload,
                    action.payload.length,
                    1
                )
                state.customerList = paginatedData
                state.tableData.total = action.payload.length
                state.tableData.pageSize = action.payload.length
                state.loading = false
            })
            .addCase(refreshCustomers.fulfilled, (state, action) => {
                const paginatedData = paginate(
                    action.payload,
                    action.payload.length,
                    1
                )
                state.customerList = paginatedData
                state.tableData.total = action.payload.length
                state.tableData.pageSize = action.payload.length
                state.loading = false
            })
    },
})

export const {
    setTableData,
    setCustomerList,
    setFilterData,
    setSelectedCustomer,
    setDrawerOpen,
    setDrawerClose,
} = customersSlice.actions

export default customersSlice.reducer
