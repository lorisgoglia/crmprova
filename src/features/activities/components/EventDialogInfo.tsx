import Dialog from '@/components/ui/Dialog'
import { closeDialog, useAppDispatch, useAppSelector } from '../store'
import dayjs from 'dayjs'
import { EventParticipantsTable } from '@/features/activities/components/EventParticipantsTable'
import { Avatar } from '@/components/ui'
import acronym from '@/utils/acronym'
import {
    defaultColorList,
    Event,
} from '@/features/activities/utils/activityUtils'

const EventDialog = () => {
    const dispatch = useAppDispatch()

    const open = useAppSelector((state) => state.crmCalendar.data.dialogOpen)
    const selected = useAppSelector((state) => state.crmCalendar.data.selected)
    const reservations = selected.extendedProps?.reservations || []
    const handleDialogClose = () => {
        dispatch(closeDialog())
    }

    const formatDate = (date?: string) => {
        if (date) return dayjs(date).format('HH:mm')

        return 'Missing date.'
    }

    const formatDay = (date?: string) => {
        if (date) return dayjs(date).format('DD/MM')

        return 'Missing date.'
    }

    const formatEventInfo = (selected: Partial<Event>) => {
        const { start, end, title } = selected

        return `${title} ${formatDay(start)} | ${formatDate(
            start
        )} -  ${formatDate(end)}`
    }

    return (
        <Dialog
            isOpen={open}
            onClose={handleDialogClose}
            onRequestClose={handleDialogClose}
            width={600}
        >
            <div className="flex items-center gap-2">
                <Avatar
                    size={40}
                    shape="circle"
                    className={`${
                        defaultColorList[selected.eventColor || 'lime'].bg
                    } ${
                        defaultColorList[selected.eventColor || 'lime'].text
                    } text-bold `}
                >
                    {acronym(selected.title)}
                </Avatar>
                <h4>{formatEventInfo(selected)}</h4>
            </div>
            <h6 className="text-right">
                Posti disponibili: {selected.extendedProps?.available_spots}
            </h6>
            <h5>Riservati: {reservations.length > 0 && reservations.length}</h5>
            <div className="max-h-96 overflow-y-auto mt-2">
                <EventParticipantsTable reservations={reservations} />
            </div>
        </Dialog>
    )
}

export default EventDialog
