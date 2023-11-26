import { KycFormState } from '@/features/customer-form/store'

type RegistrationPrintTableProps = {
    data: KycFormState['formData']
}

export const RegistrationPrintTable = ({
    data,
}: RegistrationPrintTableProps) => {
    const { personalInformation, addressInformation, cardBalance } = data
    const { firstName, lastName, phoneNumber, email } = personalInformation
    const { address, country, city, zipCode } = addressInformation
    return (
        <div className="flex flex-col mt-4 gap-4">
            <address className="not-italic">
                <div>
                    <h5>
                        {firstName} {lastName}
                    </h5>
                    <span>{address}</span>
                    <br />
                    <span>
                        {country}, {city} {zipCode}
                    </span>
                    <br />
                    <abbr title="Phone">Telefono:</abbr>
                    <span>(+39) {phoneNumber}</span>
                </div>
            </address>
            <div>
                <h5>Accessi applicazione mobile</h5>
                <div>
                    <b>Email:</b>
                    <p>{email}</p>
                </div>
                <div className="mt-2">
                    <b>Password:</b>
                    <p>XXXXXXXXXX12345678</p>
                </div>
            </div>
        </div>
    )
}
