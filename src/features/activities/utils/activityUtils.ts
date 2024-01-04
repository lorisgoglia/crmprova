import { Activity, Participants } from '@/services/models/calendar'
import uniqueId from 'lodash/uniqueId'
import i18n from 'i18next'

type Event = {
    title: string
    start: string
    end: string
    extendedProps: {
        available_spots: number
        enabled_for_reservation: boolean
        participants: Participants[]
    }
    eventColor: string
    id: string
}

const participants: Participants[] = [
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
    { first_name: 'Lorenzo', last_name: 'Cutrupi', id: 0 },
    { first_name: 'Matteo', last_name: 'Citterio', id: 1 },
]

const defaultColorList: Record<
    string,
    {
        bg: string
        text: string
        dot: string
    }
> = {
    red: {
        bg: 'bg-red-50 dark:bg-red-500/10',
        text: 'text-red-500 dark:text-red-100',
        dot: 'bg-red-500',
    },
    orange: {
        bg: 'bg-orange-50 dark:bg-orange-500/10',
        text: 'text-orange-500 dark:text-orange-100',
        dot: 'bg-orange-500',
    },
    amber: {
        bg: 'bg-amber-50 dark:bg-amber-500/10',
        text: 'text-amber-500 dark:text-amber-100',
        dot: 'bg-amber-500',
    },
    yellow: {
        bg: 'bg-yellow-50 dark:bg-yellow-500/10',
        text: 'text-yellow-500 dark:text-yellow-100',
        dot: 'bg-yellow-500',
    },
    lime: {
        bg: 'bg-lime-50 dark:bg-lime-500/10',
        text: 'text-lime-500 dark:text-lime-100',
        dot: 'bg-lime-500',
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-500/10',
        text: 'text-green-500 dark:text-green-100',
        dot: 'bg-green-500',
    },
    emerald: {
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        text: 'text-emerald-500 dark:text-emerald-100',
        dot: 'bg-emerald-500',
    },
    teal: {
        bg: 'bg-teal-50 dark:bg-teal-500/10',
        text: 'text-teal-500 dark:text-teal-100',
        dot: 'bg-teal-500',
    },
    cyan: {
        bg: 'bg-cyan-50 dark:bg-cyan-500/10',
        text: 'text-cyan-500 dark:text-cyan-100',
        dot: 'bg-cyan-500',
    },
    sky: {
        bg: 'bg-sky-50 dark:bg-sky-500/10',
        text: 'text-sky-500 dark:text-sky-100',
        dot: 'bg-sky-500',
    },
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-500/10',
        text: 'text-blue-500 dark:text-blue-100',
        dot: 'bg-blue-500',
    },
    indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-500/10',
        text: 'text-indigo-500 dark:text-indigo-100',
        dot: 'bg-indigo-500',
    },
    purple: {
        bg: 'bg-purple-50 dark:bg-purple-500/10',
        text: 'text-purple-500 dark:text-purple-100',
        dot: 'bg-purple-500',
    },
    fuchsia: {
        bg: 'bg-fuchsia-50 dark:bg-fuchsia-500/10',
        text: 'text-fuchsia-500 dark:text-fuchsia-100',
        dot: 'bg-fuchsia-500',
    },
    pink: {
        bg: 'bg-pink-50 dark:bg-pink-500/10',
        text: 'text-pink-500 dark:text-pink-100',
        dot: 'bg-pink-500',
    },
    rose: {
        bg: 'bg-rose-50 dark:bg-rose-500/10',
        text: 'text-rose-500 dark:text-rose-100',
        dot: 'bg-rose-500',
    },
}

const convertToEvents = (activity: Activity): Event[] => {
    return Object.entries(activity)
        .map(([key, value]) => {
            return value.flatMap((day) => {
                return day.slots.map((slot) => {
                    // Parse date in the format "MM-DD-YYYY"
                    const [dayOfMonth, month, year] = day.date.split('-')

                    const startDate = `${year}-${month}-${dayOfMonth}T${String(
                        slot.start_hour
                    ).padStart(2, '0')}:00:00`
                    const endDate = `${year}-${month}-${dayOfMonth}T${String(
                        slot.end_hour
                    ).padStart(2, '0')}:00:00`

                    return {
                        id: uniqueId('event-'),
                        title: i18n.t(key),
                        start: startDate,
                        end: endDate,

                        eventColor: key === 'gym' ? 'emerald' : 'sky',
                        extendedProps: {
                            available_spots: slot.available_spots,
                            enabled_for_reservation:
                                slot.enabled_for_reservation,
                            participants: participants,
                        },
                    }
                })
            })
        })
        .flat(1)
}

export { defaultColorList, Event, convertToEvents }
