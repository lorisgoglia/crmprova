import { forwardRef } from 'react'
import {
    putCollaborator,
    setDrawerClose,
    useAppDispatch,
    useAppSelector,
} from '../store'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import { UserData } from '@/services/models/users'
import CollaboratorForm, { FormikRef, FormModel } from './detail'

const CollaboratorEditContent = forwardRef<FormikRef>((_, ref) => {
    const dispatch = useAppDispatch()

    const customer = useAppSelector(
        (state) => state.collaborators.data.selectedCustomer
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
            dispatch(putCollaborator(editedCustomer as Partial<UserData>))
        }
        dispatch(setDrawerClose())
        /* dispatch(setCustomerList(newData))*/
    }

    return (
        <CollaboratorForm
            ref={ref}
            customer={customer}
            onFormSubmit={onFormSubmit}
        />
    )
})

CollaboratorEditContent.displayName = 'CustomerEditContent'

export type { FormikRef }

export default CollaboratorEditContent
