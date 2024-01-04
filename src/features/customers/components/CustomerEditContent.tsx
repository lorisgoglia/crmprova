import { forwardRef } from 'react'
import {
    putClinicalInformation,
    putCustomer,
    setDrawerClose,
    useAppDispatch,
    useAppSelector,
} from '../store'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import CustomerForm, { FormikRef, FormModel } from './detail'
import { ClinicalInformation, UserData } from '@/services/models/users'

const CustomerEditContent = forwardRef<FormikRef>((_, ref) => {
    const dispatch = useAppDispatch()

    const customer = useAppSelector(
        (state) => state.customers.data.selectedCustomer
    )

    const { user } = customer

    const onFormSubmit = (values: FormModel) => {
        const {
            firstName,
            lastName,
            dob,
            address,
            phoneNumber,
            vip,
            height,
            age,
            extra_work_activities,
            profession,
            practiced_sports,
            injuries,
            diseases,
        } = values

        const clinical_information = {
            id: user.id,
            height,
            age,
            extra_work_activities,
            profession,
            practiced_sports,
            injuries,
            diseases,
        }

        const editedCustomer = {
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            address,
            dob: dayjs(dob).format('DD-MM-YYYY'),
            is_vip: vip,
        }

        if (!isEmpty(editedCustomer)) {
            dispatch(putCustomer(editedCustomer as Partial<UserData>))
        }

        if (!isEmpty(clinical_information)) {
            dispatch(putClinicalInformation(clinical_information))
        }

        dispatch(setDrawerClose())
    }

    return (
        <CustomerForm
            ref={ref}
            customer={customer}
            onFormSubmit={onFormSubmit}
        />
    )
})

CustomerEditContent.displayName = 'CustomerEditContent'

export type { FormikRef }

export default CustomerEditContent
