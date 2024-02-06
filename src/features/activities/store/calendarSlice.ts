import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCalendar } from '@/services/CalendarService'
import {
    convertToEvents,
    Event,
} from '@/features/activities/utils/activityUtils'

type GetCrmCalendarPayload = {
    user_id: number
    start_date: string
    end_date: string
}

export type CalendarState = {
    loading: boolean
    eventList: Event[]
    dialogOpen: boolean
    selected: {
        type: string
    } & Partial<Event>
}

export const SLICE_NAME = 'crmCalendar'

export const getEvents = createAsyncThunk(
    SLICE_NAME + '/getCalendar',
    async (data: GetCrmCalendarPayload) => {
        const response = await apiGetCalendar(data)
        return response.data
    }
)

const initialState: CalendarState = {
    loading: false,
    eventList: [],
    dialogOpen: false,
    selected: {
        type: '',
    },
}

const calendarSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateEvent: (state, action) => {
            state.eventList = action.payload
        },
        openDialog: (state) => {
            state.dialogOpen = true
        },
        closeDialog: (state) => {
            state.dialogOpen = false
        },
        setSelected: (state, action) => {
            state.selected = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEvents.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.eventList = convertToEvents(action.payload)
            state.loading = false
        })
    },
})

export const { updateEvent, openDialog, closeDialog, setSelected } =
    calendarSlice.actions

export default calendarSlice.reducer
