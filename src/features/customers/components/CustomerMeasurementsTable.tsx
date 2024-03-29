import { Measurements } from '@/services/models/users'
import { Spinner, Table, Button } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { HiViewGridAdd } from 'react-icons/hi'

export const CustomerMeasurementsTable = ({
    measurements = [],
    isLoading,
    handleOpen,
}: {
    measurements: Measurements[]
    isLoading: boolean
    handleOpen: () => void
}) => {
    return (
        <div className="mt-2 w-full">
            <div className="flex justify-between items-center mb-2">
                <h4>Misurazioni:</h4>
                <Button
                    variant={'solid'}
                    onClick={handleOpen}
                    type="button"
                    className="text-md pointer"
                    icon={<HiViewGridAdd />}
                >
                    Crea nuova misurazione
                </Button>
            </div>
            {!isLoading && (
                <Table className="mt-2">
                    <THead>
                        <Tr>
                            <Th>Data Misurazione</Th>
                            <Th>Massa grassa</Th>
                            <Th>Massa magra</Th>
                            <Th>Liquidi corporei</Th>
                            <Th>Peso</Th>
                            <Th>BMI</Th>
                            <Th>Metabolismo Basale</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {measurements.map((measurement, index) => (
                            <Tr key={`${index}`}>
                                <Td>{measurement.body_fat?.date}</Td>
                                <Td>{measurement.body_fat?.value}</Td>
                                <Td>{measurement.lean_mass?.value}</Td>
                                <Td>{measurement.body_fluids?.value}</Td>
                                <Td>{measurement.weight?.value}</Td>
                                <Td>{measurement.body_mass_index?.value}</Td>
                                <Td>{measurement.basal_metabolism?.value}</Td>
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
