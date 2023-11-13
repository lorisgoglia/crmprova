import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomers,
    apPutCrmCustomer,
    apiGetCrmCustomersStatistic,
} from '@/services/CrmService'
import type { TableQueries } from '@/@types/common'
import { userDetailData } from '@/mock/data/usersData'
import paginate from '@/utils/paginate'
import { apiGetCustomers } from '@/services/CustomerService'

interface Movement {
    id: number
    quantity: string
    description: string
    date: string
    movement_type: string
    payment_method: string
    card: number
    subject_profile: number
}

interface User {
    id: number
    password: string
    last_login: string
    is_superuser: boolean
    username: string
    first_name: string
    last_name: string
    email: string
    is_staff: boolean
    is_active: boolean
    date_joined: string
    groups: any[] // You might want to replace this with the actual type if groups have a specific structure
    user_permissions: any[] // Similarly, replace this with the actual type if user_permissions have a specific structure
}

interface Card {
    id: number
    img: string | null
    balance: string
    deleted_user_tax_code: string | null
}

export interface Profile {
    id: number
    tax_code: string
    sex: string
    dob: string
    address: string
    country: string
    city: string
    zip_code: string
    img: string | null
    user: User
    card: Card
}

export interface UserData {
    id: number
    movements: Movement[]
    is_vip: boolean
    profile: Profile
}

type PersonalInfo = {
    location: string
    title: string
    birthday: string
    phoneNumber: string
    facebook: string
    twitter: string
    pinterest: string
    linkedIn: string
}

type OrderHistory = {
    id: string
    item: string
    status: string
    amount: number
    date: number
}

type PaymentMethod = {
    cardHolderName: string
    cardType: string
    expMonth: string
    expYear: string
    last4Number: string
    primary: boolean
}

type Subscription = {
    plan: string
    status: string
    billing: string
    nextPaymentDate: number
    amount: number
}

export type Customer = {
    id: string
    name: string
    email: string
    img: string
    role: string
    lastOnline: number
    status: string
    personalInfo: PersonalInfo
    orderHistory: OrderHistory[]
    paymentMethod: PaymentMethod[]
    subscription: Subscription[]
}

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
    selectedCustomer: Partial<Customer>
}

export const SLICE_NAME = 'customers'
export const getCustomers = createAsyncThunk(
    'get-customers/',
    async (data: TableQueries & { filterData?: Filter }) => {
        const response = await apiGetCustomers<UserData[]>()
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'crmCustomers/data/putCustomer',
    async (data: Customer) => {
        const response = await apPutCrmCustomer(data)
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
                state.loading = false
            })
            .addCase(getCustomers.pending, (state) => {
                state.loading = true
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
