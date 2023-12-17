import { useEffect, useCallback, useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import {
    getCollaborators,
    setTableData,
    setSelectedCustomer,
    setDrawerOpen,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import CollaboratorEditDialog from './CollaboratorEditDialog'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import dayjs from 'dayjs'
import { UserData } from '@/services/models/users'

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
            <Avatar size={28} shape="circle" src={profile.img ?? undefined} />
            <div
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold cursor-pointer`}
                onClick={onEdit}
            >
                {user.first_name} {user.last_name}
            </div>
        </div>
    )
}

const Collaborators = () => {
    const dispatch = useAppDispatch()
    const data: UserData[] = useAppSelector(
        (state) => state.collaborators.data.customerList
    )
    const loading = useAppSelector((state) => state.collaborators.data.loading)

    const filterData = useAppSelector(
        (state) => state.collaborators.data.filterData
    )

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.collaborators.data.tableData
    )

    const fetchData = useCallback(() => {
        dispatch(
            getCollaborators({ pageIndex, pageSize, sort, query, filterData })
        )
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
                header: 'Numero di telefono',
                accessorKey: 'profile.phone_number',
            },
            {
                header: 'Ultima accesso',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {dayjs(row.user.last_login).format(
                                'DD/MM/YYYY hh:mm'
                            )}
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
            <CollaboratorEditDialog />
        </>
    )
}

export default Collaborators
