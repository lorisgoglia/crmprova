import { KycFormState } from '@/features/new-customer/store'

type RegistrationPrintTableProps = {
    data: KycFormState['formData']
}

export const RegistrationPrintTable = ({
    data,
}: RegistrationPrintTableProps) => {
    const { personalInformation, addressInformation } = data
    const { first_name, last_name, phone_number, email } = personalInformation
    const { address, country, city, zip_code } = addressInformation
    return (
        <div className="flex flex-col mt-4 gap-4">
            <address className="not-italic">
                <div>
                    <h5>
                        {first_name} {last_name}
                    </h5>
                    <span>{address}</span>
                    <br />
                    <span>
                        {country}, {city} {zip_code}
                    </span>
                    <br />
                    <abbr title="Phone">Telefono:</abbr>
                    <span>(+39) {phone_number}</span>
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
                    <p>xq12djkl99H</p>
                </div>
            </div>
        </div>
    )
}
