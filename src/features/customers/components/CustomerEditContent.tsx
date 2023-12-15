import { forwardRef } from 'react'
import {
    putCustomer,
    setDrawerClose,
    useAppDispatch,
    useAppSelector,
} from '../store'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import CustomerForm, { FormikRef, FormModel } from './detail'
import { UserData } from '@/services/models/users'

const CustomerEditContent = forwardRef<FormikRef>((_, ref) => {
    const dispatch = useAppDispatch()

    const customer = useAppSelector(
        (state) => state.customers.data.selectedCustomer
    )

    const { user } = customer

    const onFormSubmit = (values: FormModel) => {
        const { firstName, lastName, dob, address, phoneNumber, vip } = values

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
        dispatch(setDrawerClose())
        /* dispatch(setCustomerList(newData))*/
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
