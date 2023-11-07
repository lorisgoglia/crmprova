import { useEffect } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import GrowShrinkTag from '@/components/shared/GrowShrinkTag'
import MediaSkeleton from '@/components/shared/loaders/MediaSkeleton'
import Loading from '@/components/shared/Loading'
import {
    getCustomerStatistic,
    setDrawerOpen,
    setSelectedCustomer,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
import type { ReactNode } from 'react'
import { HiUserAdd } from 'react-icons/all'
import { Button } from '@/components/ui'
import { Link } from 'react-router-dom'

type StatisticCardProps = {
    icon: ReactNode
    avatarClass: string
    label: string
    value?: number
    growthRate?: number
    loading: boolean
}

const StatisticCard = (props: StatisticCardProps) => {
    const { icon, avatarClass, label, value, growthRate, loading } = props

    const avatarSize = 55

    return (
        <Card bordered>
            <Loading
                loading={loading}
                customLoader={
                    <MediaSkeleton
                        avatarProps={{
                            className: 'rounded',
                            width: avatarSize,
                            height: avatarSize,
                        }}
                    />
                }
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        />
                        <div>
                            <span>{label}</span>
                            <h3>
                                <NumericFormat
                                    thousandSeparator
                                    displayType="text"
                                    value={value}
                                />
                            </h3>
                        </div>
                    </div>
                    <GrowShrinkTag value={growthRate} suffix="%" />
                </div>
            </Loading>
        </Card>
    )
}

const CustomerStatistic = () => {
    const dispatch = useAppDispatch()

    const statisticData = useAppSelector(
        (state) => state.crmCustomers.data.statisticData
    )
    const loading = /* useAppSelector(
        (state) => state.crmCustomers.data.statisticLoading
    )*/ false
    useEffect(() => {
        dispatch(getCustomerStatistic())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer({}))
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            <StatisticCard
                icon={<HiOutlineUserGroup />}
                avatarClass="!bg-indigo-600"
                label="Utenti totali"
                value={statisticData?.totalCustomers?.value || 0}
                growthRate={statisticData?.totalCustomers?.growShrink || 0}
                loading={loading}
            />
            <StatisticCard
                icon={<HiOutlineUsers />}
                avatarClass="!bg-blue-500"
                label="Utenti attivi"
                value={statisticData?.activeCustomers?.value || 0}
                growthRate={statisticData?.activeCustomers?.growShrink || 0}
                loading={loading}
            />
            <Link to="/customer/" className="cursor-pointer">
                <Button
                    variant={'solid'}
                    className={'h-full w-full'}
                    icon={<HiUserAdd />}
                >
                    Crea nuovo utente
                </Button>
            </Link>
        </div>
    )
}

export default CustomerStatistic
