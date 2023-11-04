import { useEffect, useMemo, lazy, Suspense } from 'react'
import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import reducer, {
    getForm,
    setStepStatus,
    setFormData,
    setCurrentStep,
    useAppDispatch,
    useAppSelector,
    setClearForm,
    PersonalInformation as PersonalInformationType,
    Address,
} from '../store'
import { injectReducer } from '@/store'
import useQuery from '@/utils/hooks/useQuery'

injectReducer('accountDetailForm', reducer)

const PersonalInformation = lazy(() => import('./PersonalInformation'))
const AddressInfomation = lazy(() => import('./AddressInfomation'))

const DetailForm = () => {
    const dispatch = useAppDispatch()
    const query = useQuery()

    const stepStatus = useAppSelector(
        (state) => state.accountDetailForm.data.stepStatus
    )
    const currentStep = useAppSelector(
        (state) => state.accountDetailForm.data.currentStep
    )
    const formData = useAppSelector(
        (state) => state.accountDetailForm.data.formData
    )

    useEffect(() => {
        const id = query.get('id')
        if (id) {
            console.log('ID', id)
            dispatch(getForm({ id }))
        }
        return () => {
            dispatch(setClearForm())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleNextChange = (
        values: PersonalInformationType | Address,
        name: string
    ) => {
        const nextStep = currentStep + 1
        dispatch(setFormData({ [name]: values }))
        dispatch(
            setStepStatus({
                [currentStep]: { status: 'complete' },
                [nextStep]: { status: 'current' },
            })
        )
        dispatch(setCurrentStep(nextStep))
    }

    const handleBackChange = () => {
        const previousStep = currentStep - 1
        dispatch(setCurrentStep(previousStep))
    }

    const currentStepStatus = useMemo(
        () => stepStatus[currentStep].status,
        [stepStatus, currentStep]
    )

    return (
        <Container className="h-full">
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="grid lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-5 gap-4 h-full">
                    <div className="2xl:col-span-4 lg:col-span-3 xl:col-span-2">
                        <PersonalInformation
                            data={formData.personalInformation}
                            currentStepStatus={currentStepStatus}
                            onNextChange={handleNextChange}
                        />
                        <AddressInfomation
                            data={formData.addressInformation}
                            currentStepStatus={currentStepStatus}
                            onNextChange={handleNextChange}
                            onBackChange={handleBackChange}
                        />
                    </div>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default DetailForm
