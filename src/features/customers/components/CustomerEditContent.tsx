import { forwardRef } from 'react'
import {
    setCustomerList,
    putCustomer,
    setDrawerClose,
    useAppDispatch,
    useAppSelector,
    Customer,
    UserData,
} from '../store'
import isEmpty from 'lodash/isEmpty'
import CustomerForm, { FormikRef, FormModel } from '@/features/CustomerForm'
import dayjs from 'dayjs'

const CustomerEditContent = forwardRef<FormikRef>((_, ref) => {
    const dispatch = useAppDispatch()

    const customer = useAppSelector(
        (state) => state.customers.data.selectedCustomer
    )

    const data = useAppSelector((state) => state.customers.data.customerList)
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
