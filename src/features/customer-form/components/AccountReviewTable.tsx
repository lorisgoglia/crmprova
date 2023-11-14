import { Address, PersonalInformation } from '../store'
import { useTranslation } from 'react-i18next'
import { Table } from '@/components/ui'
import TBody from '@/components/ui/Table/TBody'
import Tr from '@/components/ui/Table/Tr'
import Td from '@/components/ui/Table/Td'

type AccountReviewProps = {
    data: PersonalInformation | Address
    excluded?: string[]
}

const AccountReviewTable = ({ data, excluded = [] }: AccountReviewProps) => {
    const { t } = useTranslation()
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
                                    <Td>{value}</Td>
                                </Tr>
                            )
                        })}
                </TBody>
            </Table>
        </div>
    )
}

export default AccountReviewTable
