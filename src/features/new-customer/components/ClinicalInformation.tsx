import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, FieldProps, Form, Formik } from 'formik'
import { clinicalInfoValidator } from '@/features/new-customer/models/validators/customer-validator'
import {
    ClinicalInformationProps,
    ClinicalInformationType,
} from '@/features/new-customer/utils/clinicalInformationUtils'
import { FormNumericInput } from '@/components/shared'
import Input from '@/components/ui/Input'

const ClinicalInformation = ({
    data,
    onNextChange,
    onBackChange,
    currentStepStatus,
}: ClinicalInformationProps) => {
    const onNext = (
        values: ClinicalInformationType,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        onNextChange?.(values, 'clinicalInformation', setSubmitting)
    }

    const onBack = () => {
        onBackChange?.()
    }

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Anamnesi</h3>
                <p>Inserisci le informazioni cliniche dell&apos;utente.</p>
            </div>
            <Formik
                enableReinitialize
                initialValues={data}
                validationSchema={clinicalInfoValidator}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onNext(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <h5 className="mb-4">Informazioni cliniche</h5>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Altezza (cm)"
                                        invalid={
                                            (errors.height &&
                                                touched.height) as boolean
                                        }
                                        errorMessage={errors.height}
                                    >
                                        <Field name="height">
                                            {({ field, form }: FieldProps) => {
                                                return (
                                                    <FormNumericInput
                                                        placeholder="Altezza (cm)"
                                                        className="text-center text-lg"
                                                        suffix=" cm"
                                                        decimalScale={2}
                                                        value={field.value}
                                                        onValueChange={(e) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                e.value
                                                            )
                                                        }}
                                                    />
                                                )
                                            }}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label="Età"
                                        invalid={
                                            (errors.age &&
                                                touched.age) as boolean
                                        }
                                        errorMessage={errors.age}
                                    >
                                        <Field name="age">
                                            {({ field, form }: FieldProps) => {
                                                return (
                                                    <FormNumericInput
                                                        placeholder="Età"
                                                        className="text-center text-lg"
                                                        decimalScale={2}
                                                        value={field.value}
                                                        onValueChange={(e) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                e.value
                                                            )
                                                        }}
                                                    />
                                                )
                                            }}
                                        </Field>
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Professione"
                                        invalid={
                                            (errors.profession &&
                                                touched.profession) as boolean
                                        }
                                        errorMessage={errors.profession}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'profession'}
                                            placeholder="Professione"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Attività extra lavorative"
                                        invalid={
                                            (errors.extra_work_activities &&
                                                touched.extra_work_activities) as boolean
                                        }
                                        errorMessage={
                                            errors.extra_work_activities
                                        }
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'extra_work_activities'}
                                            placeholder="Attività extra lavorative"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Attività sportive"
                                        invalid={
                                            (errors.practiced_sports &&
                                                touched.practiced_sports) as boolean
                                        }
                                        errorMessage={errors.practiced_sports}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'practiced_sports'}
                                            placeholder="Attività sportive"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Infortuni"
                                        invalid={
                                            (errors.injuries &&
                                                touched.injuries) as boolean
                                        }
                                        errorMessage={errors.injuries}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'injuries'}
                                            placeholder="Infortuni"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Malattie"
                                        invalid={
                                            (errors.diseases &&
                                                touched.diseases) as boolean
                                        }
                                        errorMessage={errors.diseases}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'diseases'}
                                            placeholder="Malattie"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Pressione Cardiaca (mmHg / mmHg)"
                                        invalid={
                                            (errors.cardiac_pressure &&
                                                touched.cardiac_pressure) as boolean
                                        }
                                        errorMessage={errors.cardiac_pressure}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'cardiac_pressure'}
                                            placeholder="Pressione Cardiaca (mmHg / mmHg)"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" onClick={onBack}>
                                        Indietro
                                    </Button>
                                    <Button
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {currentStepStatus === 'complete'
                                            ? 'Salva'
                                            : 'Prossimo'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default ClinicalInformation
