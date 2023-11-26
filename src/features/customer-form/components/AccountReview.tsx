import { KycFormState } from '../store'
import Button from '@/components/ui/Button'
import AccountReviewTable from '@/features/customer-form/components/AccountReviewTable'

type AccountReviewProps = {
    data: KycFormState['formData']
    handleSubmit: () => void
}

const AccountReview = ({ data, handleSubmit }: AccountReviewProps) => {
    const { personalInformation, addressInformation, cardBalance } = data
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Riassunto</h3>
                <p>
                    Verifica i dati dell&apos;utente prima di di poter
                    effettuare il salvataggio.
                </p>
            </div>
            <div className="flex flex-col">
                <h5>Informazioni personali</h5>
                <AccountReviewTable
                    data={personalInformation}
                    excluded={['dialCode']}
                />
            </div>
            <div className="flex flex-col">
                <h5>Indirizzo</h5>
                <AccountReviewTable data={addressInformation} />
            </div>
            <div className="flex flex-col">
                <h5>Carta</h5>
                <AccountReviewTable data={cardBalance} />
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="solid" type="submit" onClick={handleSubmit}>
                    Salva
                </Button>
            </div>
        </>
    )
}

export default AccountReview
