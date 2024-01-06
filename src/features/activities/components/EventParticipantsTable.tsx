import { Avatar, Table } from '@/components/ui'
import Tr from '@/components/ui/Table/Tr'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { Reservation } from '@/services/models/calendar'
import acronym from '@/utils/acronym'

export const EventParticipantsTable = ({
    reservations,
}: {
    reservations: Reservation[]
}) => {
    return (
        <div className="w-full">
            {reservations.length == 0 && <h5>Nessun partecipante.</h5>}
            {reservations.length > 0 && (
                <Table className="mt-2" align="left">
                    <TBody>
                        {reservations.map((participant, index) => (
                            <Tr key={`${participant.id}_${index}`}>
                                <Td>
                                    <div className="flex items-center gap-2">
                                        <Avatar size={30} shape="circle">
                                            {acronym(
                                                `${participant.first_name} ${participant.last_name}`
                                            )}
                                        </Avatar>
                                        {`${participant.first_name} ${participant.last_name}`}
                                    </div>
                                </Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            )}
        </div>
    )
}
