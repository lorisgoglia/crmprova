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
    const { id } = customer

    const onFormSubmit = (values: FormModel) => {
        const { firstName, lastName, dob, address, email } = values

        const editedCustomer = {
            user_id: id,
            first_name: firstName,
            lastName: lastName,
            address,
            dob: dayjs(dob).format('YYYY-MM-DD'),
        }

        if (!isEmpty(editedCustomer)) {
            dispatch(
                putCustomer(
                    editedCustomer as Partial<UserData & { user_id: number }>
                )
            )
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
