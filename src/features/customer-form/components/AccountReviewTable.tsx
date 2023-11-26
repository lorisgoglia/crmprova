import { Address, CardBalance, PersonalInformation } from '../store'
import { useTranslation } from 'react-i18next'
import { Table } from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import Tr from '@/components/ui/Table/Tr'
import Td from '@/components/ui/Table/Td'
import dayjs from 'dayjs'
import appConfig from '@/configs/app.config'

type AccountReviewProps = {
    data: PersonalInformation | Address | CardBalance
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
        <div className="flex flex-col">
            <Table>
                <TBody>
                    {Object.entries(data)
                        .filter(([key]) => !excluded.includes(key))
                        .map(([key, value]) => {
                            return (
                                <Tr key={key}>
                                    <Td width={200}>
                                        <b>{t(key)}:</b>
                                    </Td>
                                    <Td>{handleValue(key, value)}</Td>
                                </Tr>
                            )
                        })}
                </TBody>
            </Table>
        </div>
    )
}

export default AccountReviewTable
