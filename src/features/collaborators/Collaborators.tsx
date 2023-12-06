import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import { injectReducer } from '@/store'
import reducer from './store'
import { Button } from '@/components/ui'
import { HiUserAdd } from 'react-icons/all'
import { Link } from 'react-router-dom'

injectReducer('collaborators', reducer)

const Collaborators = () => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                <Link to="/customer/" className="cursor-pointer">
                    <Button
                        variant={'solid'}
                        className={'h-full w-full h-[100px]'}
                        icon={<HiUserAdd />}
                    >
                        Crea nuovo collaboratore
                    </Button>
                </Link>
            </div>
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Collaborators
