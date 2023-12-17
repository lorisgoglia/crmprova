import {
    Avatar,
    Button,
    Card,
    Dialog,
    Notification,
    toast,
} from '@/components/ui'
import { HiCreditCard, HiPlus } from 'react-icons/hi'
import { useCallback, useEffect, useState } from 'react'
import { Movement, UserData } from '@/services/models/users'
import { CustomerMovementsTable } from '@/features/customers/components/CustomerMovementsTable'
import { FormNumericInput } from '@/components/shared'
import { apiChargeCard, apiGetMovements } from '@/services/CustomerService'
import dayjs from 'dayjs'
import { AxiosError } from 'axios'
import { handleError } from '@/features/new-customer/utils/errorHandling'

type CustomerCardInfoProps = {
    customer: UserData
}

export const CustomerCardInfo = ({ customer }: CustomerCardInfoProps) => {
    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [movements, setMovements] = useState<Movement[]>([])
    const [balance, setBalance] = useState(customer.card.balance)

    const getMovements = useCallback(() => {
        setIsLoading(true)
        apiGetMovements({
            user_id: customer.user.id,
            start_date: dayjs(customer.user.date_joined).format('DD-MM-YYYY'),
            end_date: dayjs().format('DD-MM-YYYY'),
        }).then(({ status, data }) => {
            setIsLoading(false)
            if (status >= 200) {
                setMovements(data.movements)
                setBalance(data.card.balance)
            }
        })
    }, [customer.user.date_joined, customer.user.id])

    useEffect(() => {
        getMovements()
    }, [])

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

    const handleClose = () => {
        setOpen(false)
        setAmount(0)
    }

    return (
        <>
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
            <CustomerMovementsTable
                movements={movements}
                isLoading={isLoading}
            />
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
                                setAmount(e.floatValue!)
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
        </>
    )
}
