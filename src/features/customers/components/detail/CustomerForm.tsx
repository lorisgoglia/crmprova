import { forwardRef } from 'react'
import Tabs from '@/components/ui/Tabs'
import { FormContainer } from '@/components/ui/Form'
import { Form, Formik, FormikProps } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import { Address, PersonalInformation } from '@/features/new-customer/store'
import { ClinicalInformation, UserData } from '@/services/models/users'
import { CustomerCardInfo } from '@/features/customers/components/detail/CustomerCardInfo'
import { CustomerClinicalInfo } from '@/features/customers/components/detail/CustomerClinicalInfo'

export type Customer = UserData

export type FormModel = Partial<
    PersonalInformation & Address & ClinicalInformation
>

export type FormikRef = FormikProps<FormModel>

export type CustomerProps = UserData

type CustomerFormProps = {
    customer: CustomerProps
    onFormSubmit: (values: FormModel) => void
}

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
})

const { TabNav, TabList, TabContent } = Tabs
const getInitialValue = (customer: UserData) => {
    if (customer) {
        const { user, profile } = customer
        return {
            firstName: user.first_name,
            lastName: user.last_name,
            dob: profile?.dob,
            address: profile?.address,
            city: profile?.city,
            email: user.email,
            phoneNumber: profile.phone_number,
            vip: customer.is_vip,
        }
    }

    return {}
}

const CustomerForm = forwardRef<FormikRef, CustomerFormProps>((props, ref) => {
    const { customer, onFormSubmit } = props
    const initialValue = getInitialValue(customer)

    return (
        <Formik<FormModel>
            innerRef={ref}
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({ touched, errors, setValues, values }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    Informazioni Personali
                                </TabNav>
                                <TabNav value="clinicalInfo">
                                    Informazioni Cliniche
                                </TabNav>
                                <TabNav value="card">Carta</TabNav>
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <PersonalInfoForm
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent>
                                <TabContent value="clinicalInfo">
                                    <CustomerClinicalInfo
                                        customer={customer}
                                        touched={touched}
                                        errors={errors}
                                        setValues={setValues}
                                        values={values}
                                    />
                                </TabContent>
                                <TabContent value="card">
                                    <CustomerCardInfo customer={customer} />
                                </TabContent>
                            </div>
                        </Tabs>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

CustomerForm.displayName = 'CustomerForm'

export default CustomerForm
