import { KycFormState } from '../store'
import Button from '@/components/ui/Button'
import AccountReviewTable from '@/features/new-customer/components/AccountReviewTable'
import { Card } from '@/components/ui'

type AccountReviewProps = {
    data: KycFormState['formData']
    handleSubmit: () => void
}

const AccountReview = ({ data, handleSubmit }: AccountReviewProps) => {
    const { personalInformation, addressInformation, cardInformation } = data
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Riassunto</h3>
                <p>
                    Verifica i dati dell&apos;utente prima di di poter
                    effettuare il salvataggio.
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <Card bordered={false} header={<h5>Informazioni personali</h5>}>
                    <AccountReviewTable
                        data={personalInformation}
                        excluded={['dialCode']}
                    />
                </Card>
                {/* <Card bordered={false} header={<h5>Informazioni cliniche</h5>}>
                    <AccountReviewTable data={clinicalInformation} />
                </Card>*/}
                <div className="grid grid-cols-2 gap-4">
                    <Card bordered={false} header={<h5>Indirizzo</h5>}>
                        <AccountReviewTable data={addressInformation} />
                    </Card>
                    <Card bordered={false} header={<h5>Carta</h5>}>
                        <AccountReviewTable data={cardInformation} />
                    </Card>
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <Button variant="solid" type="submit" onClick={handleSubmit}>
                    Salva
                </Button>
            </div>
        </>
    )
}

export default AccountReview
