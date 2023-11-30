import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetAccountFormData,
    apiSaveCustomer,
} from '@/services/AccountServices'
import dayjs from 'dayjs'
import { get18yearsOldAgeDate } from '@/features/customer-form/utils/dateUtils'
import { PersonalInformationType } from '@/features/customer-form/utils/personalInformationUtils'

export type PersonalInformation = {
    firstName: string
    lastName: string
    email: string
    nationality: string
    phoneNumber: string
    taxCode: string
    dob: string
    gender: string
    vip: boolean
}

export type Identification = {
    documentType: string
    passportCover: string
    passportDataPage: string
    nationalIdFront: string
    nationalIdBack: string
    driversLicenseFront: string
    driversLicenseBack: string
}

export type Address = {
    country: string
    address: string
    city: string
    zipCode: string
}

export type CardBalance = {
    amount: number
}

type CompanyInformation = {
    companyName: string
    contactNumber: string
    country: string
    addressLine1: string
    addressLine2: string
    city: string
    state: string
    zipCode: string
}

export type FinancialInformation = {
    taxResident: string
    tin: string
    noTin: boolean
    noTinReason: string | number
    occupation: string
    annualIncome: string
    sourceOfWealth: string
    companyInformation: CompanyInformation
}

type FormData = {
    personalInformation: PersonalInformationType
    addressInformation: Address
    cardBalance: {
        amount: number
    }
}

export type StepStatus = Record<number, { status: string }>

type GetAccountFormDataRequest = { id: string }

type GetAccountFormDataResponse = {
    formData: FormData
    formStatus: StepStatus
}

export type KycFormState = {
    formData: FormData
    stepStatus: StepStatus
    currentStep: number
}

export const SLICE_NAME = 'accountDetailForm'

export const getForm = createAsyncThunk(
    SLICE_NAME + '/getForm',
    async (data: GetAccountFormDataRequest) => {
        const response = await apiGetAccountFormData<
            GetAccountFormDataResponse,
            GetAccountFormDataRequest
        >(data)
        return response.data
    }
)

export const saveForm = createAsyncThunk(
    SLICE_NAME + '/saveForm',
    async (_, { getState }) => {
        const state = getState() as any
        const {
            firstName,
            lastName,
            email,
            gender,
            dob,
            taxCode,
            phoneNumber,
        } = state.accountDetailForm.data.formData.personalInformation
        const { address, country, city, zipCode } =
            state.accountDetailForm.data.formData.addressInformation
        const { amount } = state.accountDetailForm.data.formData.cardBalance

        const dto = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            sex: gender,
            dob: dayjs(dob).format('DD-MM-YYYY'),
            address: address,
            country: country,
            city: city,
            zip_code: zipCode,
            card_balance: amount,
            payment_method: 'Cash',
            movement_description: 'Prima ricarica on-desk.',
            password1: '12345Aa!',
            password2: '12345Aa!',
            tax_code: taxCode,
            phone_number: phoneNumber,
        }

        const response = await apiSaveCustomer<any, any>(dto)
        return response.data
    }
)
export const initialState: KycFormState = {
    formData: {
        personalInformation: {
            first_name: '',
            last_name: '',
            email: '',
            country: '',
            phone_number: '',
            tax_code: '',
            dob: get18yearsOldAgeDate(),
            sex: '',
        },
        addressInformation: {
            country: '',
            address: '',
            city: '',
            zipCode: '',
        },
        cardBalance: {
            amount: 0,
        },
    },
    stepStatus: {
        0: { status: 'pending' },
        1: { status: 'pending' },
        2: { status: 'pending' },
        3: { status: 'pending' },
        4: { status: 'pending' },
    },
    currentStep: 0,
}

const kycFormSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload }
        },
        setStepStatus: (state, action) => {
            state.stepStatus = { ...state.stepStatus, ...action.payload }
        },
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload
        },
        setClearForm: (state) => {
            state.formData = { ...initialState.formData }
            state.stepStatus = { ...initialState.stepStatus }
            state.currentStep = initialState.currentStep
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getForm.fulfilled, (state, action) => {
                state.formData = action.payload.formData
                state.stepStatus = action.payload.formStatus
            })
            .addCase(saveForm.fulfilled, (state, action) => {
                const nextStep = state.currentStep + 1
                state.stepStatus = {
                    ...state.stepStatus,
                    [state.currentStep]: { status: 'complete' },
                    [nextStep]: { status: 'current' },
                }
                state.currentStep = nextStep
            })
    },
})

export const { setFormData, setStepStatus, setCurrentStep, setClearForm } =
    kycFormSlice.actions

export default kycFormSlice.reducer
