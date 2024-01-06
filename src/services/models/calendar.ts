type GetCalendarResponse = Activity

interface Activity {
    [key: string]: Day[]
}

interface Day {
    date: string
    slots: Slot[]
}

interface Slot {
    start_hour: number
    end_hour: number
    available_spots: number
    enabled_for_reservation: boolean
    reservations: Reservation[]
}

interface Reservation {
    first_name: string
    last_name: string
    id: number
}

export { GetCalendarResponse, Slot, Activity, Day, Reservation }
