import AdaptableCard from '@/components/shared/AdaptableCard'
import CollaboratorsTableTools from './components/CollaboratorsTableTools'
import { injectReducer } from '@/store'
import reducer from './store'
import { Button } from '@/components/ui'
import { HiUserAdd } from 'react-icons/all'
import { Link } from 'react-router-dom'
import CollaboratorsTable from '@/features/collaborators/components/CollaboratorsTable'

injectReducer('collaborators', reducer)

const Collaborators = () => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                <Link to="/collaborator/" className="cursor-pointer">
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
                <CollaboratorsTableTools />
                <CollaboratorsTable />
            </AdaptableCard>
        </>
    )
}

export default Collaborators
