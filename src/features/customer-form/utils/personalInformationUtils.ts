import { Profile, User } from '@/features/customers/store'

export type PersonalInformationType = Partial<User & Profile>

export type PersonalInformationProps = {
    data: PersonalInformationType
    onNextChange?: (
        values: PersonalInformationType,
        formName: string,
        setSubmitting: (isSubmitting: boolean) => void
    ) => void
    currentStepStatus?: string
}

const genderOptions = [
    { label: 'Maschio', value: 'M' },
    { label: 'Femmina', value: 'F' },
    { label: 'Altro', value: 'O' },
]

export { genderOptions }
