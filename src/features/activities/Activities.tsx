import { useEffect, useState } from 'react'
import CalendarView from '@/components/shared/CalendarView'
import Container from '@/components/shared/Container'
import reducer, {
    getEvents,
    setSelected,
    openDialog,
    useAppDispatch,
    useAppSelector,
} from './store'
import { injectReducer } from '@/store'
import dayjs from 'dayjs'
import type { EventClickArg, DateSelectArg } from '@fullcalendar/core'
import { EventContent } from '@/features/activities/components/EventContent'
import { Loading } from '@/components/shared'
import EventDialogInfo from '@/features/activities/components/EventDialogInfo'

injectReducer('crmCalendar', reducer)

const Activities = () => {
    const dispatch = useAppDispatch()
    const events = useAppSelector((state) => state.crmCalendar.data.eventList)
    const loading = useAppSelector((state) => state.crmCalendar.data.loading)
    const user = useAppSelector((state) => state.auth.user)
    const [currentWeek, setCurrentWeek] = useState<null | {
        start: string
        end: string
    }>(null)

    useEffect(() => {
        if (currentWeek !== null)
            dispatch(
                getEvents({
                    user_id: user.id!,
                    start_date: currentWeek.start,
                    end_date: currentWeek.end,
                })
            )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWeek])

    /*    const onCellSelect = (event: DateSelectArg) => {
        const { start, end } = event
        dispatch(
            setSelected({
                type: 'NEW',
                start: dayjs(start).format(),
                end: dayjs(end).format(),
            })
        )
        dispatch(openDialog())
    }*/

    const onEventClick = (arg: EventClickArg) => {
        const { start, end, id, title, extendedProps } = arg.event

        dispatch(
            setSelected({
                type: 'EDIT',
                eventColor: extendedProps.eventColor,
                title,
                start: start?.toString(),
                end: end?.toString(),
                id,
                extendedProps,
            })
        )
        dispatch(openDialog())
    }

    const onWeekChange = (data: any) => {
        const { end, start } = data
        const week = {
            start: dayjs(start).format('DD-MM-YYYY'),
            end: dayjs(end).format('DD-MM-YYYY'),
        }
        setCurrentWeek(week)
    }

    return (
        <Container className="h-full relative">
            <CalendarView
                initialView="timeGridWeek"
                locale="it"
                headerToolbar={{
                    left: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay prev,next',
                }}
                slotDuration="00:15:00"
                slotMinTime="08:00:00"
                slotMaxTime="24:00:00"
                allDayText="Tutto il giorno"
                allDayClassNames="h-[100px] font-bold"
                buttonText={{
                    dayGridMonth: 'Mese',
                    timeGridWeek: 'Settimana',
                    timeGridDay: 'Giorno',
                }}
                firstDay={1}
                editable
                selectable
                events={events}
                eventClick={onEventClick}
                eventContent={EventContent}
                datesSet={onWeekChange}
            />
            <EventDialogInfo />
            {loading && (
                <div className="rounded-lg absolute flex top-0 left-0 h-full w-full items-center justify-center z-50">
                    <Loading loading={loading} />
                </div>
            )}
        </Container>
    )
}

export default Activities
