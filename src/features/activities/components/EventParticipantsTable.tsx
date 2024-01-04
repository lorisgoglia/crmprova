import { Avatar, Table } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { Participants } from '@/services/models/calendar'
import acronym from '@/utils/acronym'

export const EventParticipantsTable = ({
    participants,
}: {
    participants: Participants[]
}) => {
    return (
        <div className="w-full">
            {participants.length > 0 && (
                <Table className="mt-2" align="left">
                    <TBody>
                        {participants.map((participant, index) => (
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
