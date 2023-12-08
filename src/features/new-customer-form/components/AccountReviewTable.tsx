import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import appConfig from '@/configs/app.config'
import { PersonalInformationType } from '@/features/new-customer-form/utils/personalInformationUtils'
import { AddressInformationType } from '@/features/new-customer-form/utils/addressInformationUtils'
import { CardInformationType } from '@/features/new-customer-form/store'

type AccountReviewProps = {
    data: PersonalInformationType | AddressInformationType | CardInformationType
    excluded?: string[]
}

const AccountReviewTable = ({ data, excluded = [] }: AccountReviewProps) => {
    const { t } = useTranslation()
    const handleValue = (key: string, v: any) => {
        if (v instanceof Date || key === 'dob') {
            return dayjs(v).format(appConfig.dateFormat)
        }

        return v
    }
    return (
        <div className="grid grid-cols-2 gap-2">
            {Object.entries(data)
                .filter(([key]) => !excluded.includes(key))
                .map(([key, value]) => {
                    return (
                        <div key={key}>
                            <b>{t(key)}:</b>
                            <span className="ml-2">
                                {handleValue(key, value)}
                            </span>
                        </div>
                    )
                })}
        </div>
    )
}

export default AccountReviewTable
