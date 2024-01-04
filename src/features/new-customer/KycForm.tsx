import { useEffect, useMemo, lazy, Suspense } from 'react'
import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import FormStep from './components/FormStep'
import reducer, {
    setStepStatus,
    setFormData,
    setCurrentStep,
    useAppDispatch,
    useAppSelector,
    setClearForm,
    saveForm,
    CardInformationType,
} from './store'
import { injectReducer } from '@/store'
import useQuery from '@/utils/hooks/useQuery'
import CardBalanceRecharge from '@/features/new-customer/components/CardBalanceRecharge'
import { PersonalInformationType } from '@/features/new-customer/utils/personalInformationUtils'
import { AddressInformationType } from '@/features/new-customer/utils/addressInformationUtils'
import { ClinicalInformationType } from '@/features/new-customer/utils/clinicalInformationUtils'

injectReducer('accountDetailForm', reducer)

const PersonalInformation = lazy(
    () => import('./components/PersonalInformation')
)
const AddressInfomation = lazy(() => import('./components/AddressInformation'))
const RegistrationPrint = lazy(() => import('./components/RegistrationPrint'))
const AccountReview = lazy(() => import('./components/AccountReview'))

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
        return () => {
            dispatch(setClearForm())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleNextChange = (
        values:
            | PersonalInformationType
            | AddressInformationType
            | CardInformationType
            | ClinicalInformationType,
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

    const handleSubmit = () => {
        dispatch(saveForm())
    }

    return (
        <Container className="h-full">
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="grid lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-5 gap-4 h-full">
                    {currentStep !== 4 && (
                        <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-2">
                            <FormStep
                                currentStep={currentStep}
                                currentStepStatus={currentStepStatus}
                                stepStatus={stepStatus}
                            />
                        </div>
                    )}
                    <div
                        className={'2xl:col-span-4 lg:col-span-3 xl:col-span-2'}
                    >
                        <Suspense fallback={<></>}>
                            {currentStep === 0 && (
                                <PersonalInformation
                                    data={formData.personalInformation}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                />
                            )}
                            {currentStep === 1 && (
                                <AddressInfomation
                                    data={formData.addressInformation}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                />
                            )}
                            {/*{currentStep === 2 && (
                                <ClinicalInformation
                                    data={formData.clinicalInformation}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                />
                            )}*/}
                            {currentStep === 2 && (
                                <CardBalanceRecharge
                                    data={formData.cardInformation}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                />
                            )}
                            {currentStep === 3 && (
                                <AccountReview
                                    data={formData}
                                    handleSubmit={handleSubmit}
                                />
                            )}
                            {currentStep === 4 && <RegistrationPrint />}
                        </Suspense>
                    </div>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default DetailForm
