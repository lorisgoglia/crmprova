import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import { injectReducer } from '@/store'
import reducer from './store'
import CustomerStatisticWithAction from '@/features/customers/components/CustomerStatisticWithAction'

injectReducer('customers', reducer)

const Customers = () => {
    return (
        <>
            <CustomerStatisticWithAction />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Customers
