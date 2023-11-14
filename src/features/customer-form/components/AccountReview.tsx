import { KycFormState } from '../store'
import Button from '@/components/ui/Button'
import AccountReviewTable from '@/features/customer-form/components/AccountReviewTable'

type AccountReviewProps = {
    data: KycFormState['formData']
}

const AccountReview = ({ data }: AccountReviewProps) => {
    const { personalInformation, addressInformation } = data
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

            <h5>Anamnesi</h5>
            <div className="flex justify-end gap-2">
                <Button variant="solid" type="submit">
                    Salva
                </Button>
            </div>
        </>
    )
}

export default AccountReview
