import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAccountFormData } from '@/services/AccountServices'
import dayjs from 'dayjs'
import { get18yearsOldAgeDate } from '@/features/new-customer/utils/dateUtils'
import { Profile, User } from '@/services/models/users'
import { apiSaveCollaborator } from '@/services/CollaboratorService'

export type FormData = Partial<User & Profile>

export type StepStatus = Record<number, { status: string }>

type GetAccountFormDataRequest = { id: string }

type GetAccountFormDataResponse = {
    formData: FormData
    formStatus: StepStatus
}

export type KycFormState = {
    formData: FormData
}

export const SLICE_NAME = 'collaboratorForm'

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

export const saveForm = async (form: Partial<User & Profile>) => {
    const {
        first_name,
        last_name,
        email,
        sex,
        dob,
        tax_code,
        phone_number,
        address,
        country,
        city,
        zip_code,
    } = form

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
        card_balance: '0',
        payment_method: 'Cash',
        movement_description: 'Prima ricarica on-desk.',
        password1: '12345Aa!',
        password2: '12345Aa!',
        tax_code: tax_code,
        phone_number: phone_number,
    }

    const response = await apiSaveCollaborator<any, any>(dto)
    return response
}

export const initialState: KycFormState = {
    formData: {
        first_name: '',
        last_name: '',
        email: '',
        country: '',
        phone_number: '',
        tax_code: '',
        dob: get18yearsOldAgeDate(),
        sex: '',
        address: '',
        city: '',
        zip_code: '',
    },
}

const collaboratorFormSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getForm.fulfilled, (state, action) => {
            state.formData = action.payload.formData
        })
    },
})

export default collaboratorFormSlice.reducer
