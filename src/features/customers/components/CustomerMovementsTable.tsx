import { Movement } from '@/services/models/users'
import { Spinner, Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'

export const CustomerMovementsTable = ({
    movements,
    isLoading,
}: {
    movements: Movement[]
    isLoading: boolean
}) => {
    return (
        <div className="mt-2 w-full">
            <h4>Movimenti:</h4>
            {!isLoading && (
                <Table className="mt-2">
                    <THead>
                        <Tr>
                            <Th>Descrizione</Th>
                            <Th>Data</Th>
                            <Th>Importo</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {movements.map((movement, index) => (
                            <Tr key={`${movement.id}_${index}`}>
                                <Td>{movement.description}</Td>
                                <Td>{movement.date}</Td>
                                <Td>
                                    <b>{movement.quantity}</b> EUR
                                </Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            )}
            <div className="flex w-full h-[200px] justify-center items-center">
                {isLoading && (
                    <Spinner
                        isSpining={isLoading}
                        className="w-full"
                        size={40}
                    />
                )}
            </div>
        </div>
    )
}
