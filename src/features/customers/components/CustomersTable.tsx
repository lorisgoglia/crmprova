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
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import { UserData } from '@/services/models/users'
import acronym from '@/utils/acronym'

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
            Modifica
        </div>
    )
}

const NameColumn = ({ row }: { row: UserData }) => {
    const { textTheme } = useThemeClass()
    const { profile, user } = row
    const dispatch = useAppDispatch()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }

    return (
        <div className="flex items-center">
            <Avatar size={30} shape="circle">
                {acronym(`${user.first_name} ${user.last_name}`)}
            </Avatar>
            <div
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold cursor-pointer`}
                onClick={onEdit}
            >
                {user.first_name} {user.last_name}
            </div>
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
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Email',
                accessorKey: 'user.email',
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
                            {row.card.balance + ' EUR'}
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
                            {row.is_vip ? 'SI' : 'NO'}
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
            {data.length > 0 && (
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
            )}
            <CustomerEditDialog />
        </>
    )
}

export default Customers
