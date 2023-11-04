import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAccountFormData } from '@/services/AccountServices'

export type PersonalInformation = {
    firstName: string
    lastName: string
    email: string
    nationality: string
    dialCode: string
    phoneNumber: string
    dob: string
    gender: string
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
    personalInformation: PersonalInformation
    addressInformation: Address
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

export const initialState: KycFormState = {
    formData: {
        personalInformation: {
            firstName: '',
            lastName: '',
            email: '',
            nationality: '',
            dialCode: '',
            phoneNumber: '',
            dob: '',
            gender: '',
        },
        addressInformation: {
            country: '',
            address: '',
            city: '',
            zipCode: '',
        },
    },
    stepStatus: {
        0: { status: 'pending' },
        1: { status: 'pending' },
        2: { status: 'pending' },
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
        builder.addCase(getForm.fulfilled, (state, action) => {
            state.formData = action.payload.formData
            state.stepStatus = action.payload.formStatus
        })
    },
})

export const { setFormData, setStepStatus, setCurrentStep, setClearForm } =
    kycFormSlice.actions

export default kycFormSlice.reducer
