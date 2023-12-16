import { forwardRef, useCallback, useEffect, useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import { FormContainer } from '@/components/ui/Form'
import { Form, Formik, FormikProps } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import { Address, PersonalInformation } from '@/features/new-customer/store'
import {
    Avatar,
    Button,
    Card,
    Notification,
    Table,
    toast,
} from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import Tr from '@/components/ui/Table/Tr'
import Td from '@/components/ui/Table/Td'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import { Movement, UserData } from '@/services/models/users'
import { HiCreditCard, HiPlus } from 'react-icons/hi'
import { Dialog } from '@/components/ui/Dialog'
import { FormNumericInput } from '@/components/shared'
import { AxiosError } from 'axios'
import { handleError } from '@/features/new-customer/utils/errorHandling'
import { apiChargeCard, apiGetMovements } from '@/services/CustomerService'

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
    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [movements, setMovements] = useState<Movement[]>([])
    const [balance, setBalance] = useState(customer.card.balance)

    const getMovements = useCallback(() => {
        apiGetMovements({
            user_id: customer.user.id,
            start_date: dayjs(customer.user.date_joined).format('DD-MM-YYYY'),
            end_date: dayjs().format('DD-MM-YYYY'),
        }).then(({ status, data }) => {
            if (status >= 200) {
                setMovements(data.movements)
                setBalance(data.card.balance)
            }
        })
    }, [customer.user.date_joined, customer.user.id])

    useEffect(() => {
        getMovements()
    }, [])

    const handleClose = () => {
        setOpen(false)
        setAmount(0)
    }

    const handleSubmit = async () => {
        if (amount <= 0) {
            return
        }

        setIsLoading(true)

        const data = {
            user_id: customer.user.id,
            quantity: amount,
            description: 'Ricarica on-desk.',
            payment_method: 'Cash',
        }
        await apiChargeCard(data)
            .then(({ status }) => {
                setIsLoading(false)
                if (status >= 200) {
                    toast.push(
                        <Notification title={'Salvato'} type={'success'}>
                            Ricarica effettuata con successo!
                        </Notification>
                    )
                    getMovements()
                    handleClose()
                }
            })
            .catch((error: AxiosError) => {
                setIsLoading(false)
                const { title, message } = handleError(error)

                toast.push(
                    <Notification title={title} type={'danger'}>
                        {message}
                    </Notification>
                )
            })
    }

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
                                    <div className="grid grid-cols-2 gap-2">
                                        <Card bodyClass="flex justify-between items-centerw-full">
                                            <div className="flex items-center gap-4">
                                                <Avatar
                                                    className="bg-emerald-500"
                                                    shape="circle"
                                                    size="lg"
                                                    icon={<HiCreditCard />}
                                                ></Avatar>
                                                <div>
                                                    <h4>Credito</h4>
                                                    <h2>{balance} EUR</h2>
                                                </div>
                                            </div>
                                        </Card>
                                        <Button
                                            className={'h-full w-full'}
                                            icon={<HiPlus />}
                                            variant="solid"
                                            onClick={() => setOpen(true)}
                                            type="button"
                                        >
                                            Ricarica Carta
                                        </Button>
                                    </div>

                                    <div className="mt-2">
                                        <h4>Movimenti:</h4>
                                        <Table className="mt-2">
                                            <THead>
                                                <Tr>
                                                    <Th>Descrizione</Th>
                                                    <Th>Data</Th>
                                                    <Th>Importo</Th>
                                                </Tr>
                                            </THead>
                                            <TBody>
                                                {movements.map(
                                                    (movement, index) => (
                                                        <Tr
                                                            key={`${movement.id}_${index}`}
                                                        >
                                                            <Td>
                                                                {
                                                                    movement.description
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {movement.date}
                                                            </Td>
                                                            <Td>
                                                                <b>
                                                                    {
                                                                        movement.quantity
                                                                    }
                                                                </b>{' '}
                                                                EUR
                                                            </Td>
                                                        </Tr>
                                                    )
                                                )}
                                            </TBody>
                                        </Table>
                                    </div>
                                </TabContent>
                            </div>
                        </Tabs>
                        <Dialog
                            isOpen={open}
                            width={400}
                            onRequestClose={handleClose}
                            onClose={handleClose}
                        >
                            <h5>Ricarica Carta</h5>
                            <div className="flex items-center justify-center mt-4 mb-4">
                                <div className="text-center my-8">
                                    <h4 className="mb-4">Importo</h4>
                                    <FormNumericInput
                                        placeholder="Importo"
                                        className="text-center text-lg"
                                        suffix=" EUR"
                                        decimalScale={2}
                                        value={amount}
                                        onValueChange={(e) => {
                                            setAmount(e.floatValue)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-6 mb-2">
                                <span>Metodo di pagamento</span>
                                <span className="font-semibold heading-text">
                                    <div className="flex items-center gap-1">
                                        <span>CONTANTI</span>
                                    </div>
                                </span>
                            </div>
                            <Button
                                block
                                loading={isLoading}
                                className="mt-6"
                                variant="solid"
                                onClick={handleSubmit}
                            >
                                Conferma
                            </Button>
                        </Dialog>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

CustomerForm.displayName = 'CustomerForm'

export default CustomerForm
