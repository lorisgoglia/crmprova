import { useEffect, useCallback, useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import {
    getCustomers,
    setTableData,
    setSelectedCustomer,
    setDrawerOpen,
    useAppDispatch,
    useAppSelector,
    UserData,
    Profile,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'

const statusColor: Record<string, string> = {
    active: 'bg-emerald-500',
    blocked: 'bg-red-500',
}

const ActionColumn = ({ row }: { row: UserData }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useAppDispatch()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }

    return (
        <div
            className={`${textTheme} cursor-pointer select-none font-semibold`}
            onClick={onEdit}
        >
            Edit
        </div>
    )
}

const NameColumn = ({ row }: { row: Profile }) => {
    const { textTheme } = useThemeClass()
    const { user } = row

    return (
        <div className="flex items-center">
            <Avatar size={28} shape="circle" src={row.img ?? undefined} />
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/app/crm/customer-details?id=${row.id}`}
            >
                {user.first_name} {user.last_name}
            </Link>
        </div>
    )
}

const Customers = () => {
    const dispatch = useAppDispatch()
    const data: UserData[] = useAppSelector(
        (state) => state.customers.data.customerList
    )
    const loading = useAppSelector((state) => state.customers.data.loading)

    const filterData = useAppSelector(
        (state) => state.customers.data.filterData
    )

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.customers.data.tableData
    )

    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageIndex, pageSize, sort, query, filterData }))
    }, [pageIndex, pageSize, sort, query, filterData, dispatch])

    useEffect(() => {
        fetchData()
    }, [])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<UserData>[] = useMemo(
        () => [
            {
                header: 'Nome',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row.profile} />
                },
            },
            {
                header: 'Email',
                accessorKey: 'profile.user.email',
            },
            {
                header: 'Data di nascità',
                accessorKey: 'profile.dob',
            },
            {
                header: 'Credito',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row.profile.card.balance + ' EUR'}
                        </div>
                    )
                },
            },
            {
                header: 'VIP',
                accessorKey: 'plan',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row.is_vip ? '✅' : '❌'}
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <CustomerEditDialog />
        </>
    )
}

export default Customers
