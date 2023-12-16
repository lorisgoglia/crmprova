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
            <h2>Clienti</h2>
            <div className="mt-4">
                <CustomerStatisticWithAction />
                <AdaptableCard className="h-full" bodyClass="h-full">
                    <CustomersTableTools />
                    <CustomersTable />
                </AdaptableCard>
            </div>
        </>
    )
}

export default Customers
