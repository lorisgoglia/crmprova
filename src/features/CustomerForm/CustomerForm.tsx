import { forwardRef } from 'react'
import Tabs from '@/components/ui/Tabs'
import { FormContainer } from '@/components/ui/Form'
import { Form, Formik, FormikProps } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import SocialLinkForm from './SocialLinkForm'
import { UserData } from '@/features/customers/store'
import { Address, PersonalInformation } from '@/features/customer-form/store'

export type Customer = UserData

export type FormModel = Partial<PersonalInformation & Address>

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
        const { profile } = customer
        return {
            firstName: profile?.user.first_name,
            lastName: profile?.user.last_name,
            dob: profile?.dob,
            address: profile?.address,
            city: profile?.city,
            email: profile?.user.email,
            phoneNumber: '',
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
            {({ touched, errors }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    Informazioni Personali
                                </TabNav>
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <PersonalInfoForm
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent>
                                {/*<TabContent value="social">
                                    <SocialLinkForm
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent>*/}
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
