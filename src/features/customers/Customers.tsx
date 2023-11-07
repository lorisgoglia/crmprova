import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import { injectReducer, useAppDispatch } from '@/store'
import reducer, {
    setDrawerClose,
    setSelectedCustomer,
    useAppSelector,
} from './store'
import CustomerStatisticWithAction from '@/features/customers/components/CustomerStatisticWithAction'
import { apiGetCustomerDetails } from '@/services/CustomerService'
import KycFormForDialog from '@/features/customer-form/components/KycFormForDialog'
import { Dialog } from '@/components/ui'

injectReducer('crmCustomers', reducer)

const Customers = () => {
    const dispatch = useAppDispatch()

    const drawerOpen = useAppSelector(
        (state) => state.crmCustomers.data.drawerOpen
    )

    const onDrawerClose = () => {
        dispatch(setDrawerClose())
        dispatch(setSelectedCustomer({}))
    }

    return (
        <>
            <CustomerStatisticWithAction />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools />
                <CustomersTable />
                {/*<Dialog
                    isOpen={drawerOpen}
                    width={1200}
                    onClose={onDrawerClose}
                >
                    <div className="flex flex-col h-full justify-between">
                        <div className="max-h-[700px] overflow-y-auto">
                            <KycFormForDialog />
                        </div>
                    </div>
                </Dialog>*/}
            </AdaptableCard>
        </>
    )
}

export default Customers
