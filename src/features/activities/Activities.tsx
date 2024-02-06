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
import type { EventClickArg } from '@fullcalendar/core'
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

    const renderHeaderContent = (args: any) => {
        const today = new Date();
        const headerDate = new Date(args.date);
    
        // Format and compare dates to see if the header corresponds to today
        if (today.toDateString() === headerDate.toDateString()) {
            return (
                <div className="current-day-header">
                    {args.text} {/* Use the default text but wrap it in a custom div */}
                </div>
            );
        }
    
        return args.text; // Return default text for other days
    };
    

    return (
        <Container className="h-full w-full relative">
            <CalendarView
                initialView="timeGridWeek"
                locale="it"
                headerToolbar={{
                    left: 'prev,next title',
                    center: '',
                    right: 'timeGridWeek,timeGridDay',
                }}
                slotDuration="01:00:00"
                slotMinTime="08:00:00"
                slotMaxTime="23:00:00"
                slotLabelInterval="01:00"
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    omitZeroMinute: true,
                    meridiem: 'lowercase'
                  }
                }
                allDaySlot={false}
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
                eventDisplay='block'
                slotEventOverlap={false}
                datesSet={onWeekChange}
                dayHeaderContent={renderHeaderContent}

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
