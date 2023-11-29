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
import { Table } from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import Tr from '@/components/ui/Table/Tr'
import Td from '@/components/ui/Table/Td'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'

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
            {({ touched, errors }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    Informazioni Personali
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
                                <TabContent value="card">
                                    <div className="flex flex-col gap-2">
                                        <h5>Dati carta:</h5>
                                        <p>
                                            <b>ID Carta: {customer.card.id}</b>
                                        </p>
                                        <p>
                                            <b>
                                                Credito: {customer.card.balance}{' '}
                                                EUR
                                            </b>
                                        </p>
                                    </div>
                                    <div className="mt-2">
                                        <h5>Transazioni:</h5>
                                        <Table className="mt-2">
                                            <THead>
                                                <Tr>
                                                    <Th>Motivazione</Th>
                                                    <Th>Importo</Th>
                                                </Tr>
                                            </THead>
                                            <TBody>
                                                <Tr>
                                                    <Td>Ricarica Iniziale</Td>
                                                    <Td>
                                                        {customer.card.balance}
                                                        EUR
                                                    </Td>
                                                </Tr>
                                            </TBody>
                                        </Table>
                                    </div>
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
