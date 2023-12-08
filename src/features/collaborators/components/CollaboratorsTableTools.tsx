import { useRef } from 'react'
import Button from '@/components/ui/Button'
import {
    setTableData,
    setFilterData,
    useAppDispatch,
    useAppSelector,
    getCollaborators,
} from '../store'
import CustomerTableSearch from './CustomerTableSearch'
import cloneDeep from 'lodash/cloneDeep'
import type { TableQueries } from '@/@types/common'

const CollaboratorsTableTools = () => {
    const dispatch = useAppDispatch()

    const inputRef = useRef<HTMLInputElement>(null)

    const tableData = useAppSelector(
        (state) => state.collaborators.data.tableData
    )

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data: TableQueries) => {
        dispatch(setTableData(data))
        dispatch(getCollaborators(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        if (inputRef.current) {
            inputRef.current.value = ''
        }
        dispatch(setFilterData({ status: '' }))
        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
                <CustomerTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                {/* <CustomerTableFilter />*/}
            </div>
            <div className="mb-4">
                <Button size="sm" onClick={onClearAll}>
                    Cancella filtri
                </Button>
            </div>
        </div>
    )
}

export default CollaboratorsTableTools
