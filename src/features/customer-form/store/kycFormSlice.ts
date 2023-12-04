import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetAccountFormData,
    apiSaveCustomer,
} from '@/services/AccountServices'
import dayjs from 'dayjs'
import { get18yearsOldAgeDate } from '@/features/customer-form/utils/dateUtils'
import { PersonalInformationType } from '@/features/customer-form/utils/personalInformationUtils'
import { AddressInformationType } from '@/features/customer-form/utils/addressInformationUtils'
import { Card } from '@/features/customers/store'

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

export type CardInformationType = Partial<Card>

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
    addressInformation: AddressInformationType
    cardInformation: CardInformationType
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
            first_name,
            last_name,
            email,
            sex,
            dob,
            tax_code,
            phone_number,
        } = state.accountDetailForm.data.formData.personalInformation
        const { address, country, city, zip_code } =
            state.accountDetailForm.data.formData.addressInformation
        const { balance } =
            state.accountDetailForm.data.formData.cardInformation

        const dto = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            sex: sex,
            dob: dayjs(dob).format('DD-MM-YYYY'),
            address: address,
            country: country,
            city: city,
            zip_code: zip_code,
            card_balance: balance.toString(),
            payment_method: 'Cash',
            movement_description: 'Prima ricarica on-desk.',
            password1: '12345Aa!',
            password2: '12345Aa!',
            tax_code: tax_code,
            phone_number: phone_number,
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
            zip_code: '',
        },
        cardInformation: {
            balance: 0,
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
