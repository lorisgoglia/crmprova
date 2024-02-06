import ApiService from './ApiService'
import { GetCalendarResponse } from '@/services/models/calendar'

export async function apiGetCalendar<U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<GetCalendarResponse>({
        url: `/get-calendar/${data.user_id}/${data.start_date}/${data.end_date}`,
        method: 'get',
    })
}
