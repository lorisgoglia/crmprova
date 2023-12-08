import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { TableQueries } from '@/@types/common'
import paginate from '@/utils/paginate'
import {
    apiGetCollaborators,
    apiPutCollaborator,
} from '@/services/CollaboratorService'
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

export type CollaboratorsState = {
    loading: boolean
    statisticLoading: boolean
    customerList: UserData[]
    statisticData: Partial<CustomerStatistic>
    tableData: TableQueries
    filterData: Filter
    drawerOpen: boolean
    selectedCustomer: UserData | object
}

export const SLICE_NAME = 'collaborators'
export const getCollaborators = createAsyncThunk(
    'get-collaborators/',
    async (data: TableQueries & { filterData?: Filter }) => {
        const response = await apiGetCollaborators<UserData[]>()
        if (data.query)
            return response.data.filter((c) =>
                (c.user.first_name + ' ' + c.user.last_name).includes(
                    data.query!
                )
            )

        return response.data
    }
)

export const putCollaborator = createAsyncThunk(
    'putCustomer/',
    async (data: Partial<UserData>) => {
        const update = await apiPutCollaborator(data)
        const response = await apiGetCollaborators<UserData[]>()
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

const initialState: CollaboratorsState = {
    loading: false,
    statisticLoading: false,
    customerList: [],
    statisticData: {},
    tableData: initialTableData,
    filterData: initialFilterData,
    drawerOpen: false,
    selectedCustomer: {},
}

const collaboratorSlice = createSlice({
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
            .addCase(getCollaborators.fulfilled, (state, action) => {
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
            .addCase(getCollaborators.pending, (state) => {
                state.loading = true
            })
            .addCase(putCollaborator.fulfilled, (state, action) => {
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
} = collaboratorSlice.actions

export default collaboratorSlice.reducer
