import { ClinicalInformation } from '@/services/models/users'

export type ClinicalInformationType = Partial<ClinicalInformation>

export type ClinicalInformationProps = {
    data: ClinicalInformationType
    onNextChange?: (
        values: ClinicalInformationType,
        formName: string,
        setSubmitting: (isSubmitting: boolean) => void
    ) => void
    onBackChange?: () => void
    currentStepStatus?: string
}
