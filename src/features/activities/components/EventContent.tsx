import classNames from 'classnames'
import Badge from '@/components/ui/Badge'
import { defaultColorList } from '@/features/activities/utils/activityUtils'

export const EventContent = (arg: any) => {
    const { extendedProps } = arg.event
    const { isEnd, isStart, view } = arg

    const availabilityIndicator = (availableSpots: number) => {
        if (availableSpots >= 12) return 'bg-green-500'

        if (availableSpots >= 6 && availableSpots <= 12) return 'bg-yellow-500'

        if (availableSpots <= 6) return 'bg-red-500'
    }

    return (
        <div
            className={classNames(
                'custom-calendar-event !items-start',
                view.type === 'dayGridMonth' ? '!h-[80px]' : null,
                extendedProps.eventColor
                    ? defaultColorList[extendedProps.eventColor]?.bg
                    : '',
                extendedProps.eventColor
                    ? defaultColorList[extendedProps.eventColor]?.text
                    : '',
                isEnd &&
                    !isStart &&
                    '!rounded-tl-none !rounded-bl-none !rtl:rounded-tr-none !rtl:rounded-br-none',
                !isEnd &&
                    isStart &&
                    '!rounded-tr-none !rounded-br-none !rtl:rounded-tl-none !rtl:rounded-bl-none',
                ''
            )}
        >
            {!(isEnd && !isStart) && (
                <Badge
                    className={classNames(
                        availabilityIndicator(extendedProps?.available_spots),
                        'absolute -top-0.5 -left-0.5 z-50'
                    )}
                />
            )}
            <div className="flex flex-col ">
                {!(isEnd && !isStart) && (
                    <span className="font-bold text-[10px]">
                        {arg.timeText}
                    </span>
                )}
                <span className="font-semibold">{arg.event.title}</span>
                <span className="text-[9px] absolute bottom-1">
                    Disponibili: {extendedProps?.available_spots}
                </span>
            </div>
        </div>
    )
}
