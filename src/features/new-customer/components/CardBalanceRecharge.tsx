import Input, { InputProps } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, FieldInputProps, FieldProps, Form, Formik } from 'formik'
import { CardInformationType } from '../store'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { ComponentType } from 'react'
import { cardInfoValidator } from '@/features/new-customer/models/validators/customer-validator'
import { FormNumericInput } from '@/components/shared'

type FormModel = CardInformationType

type CardBalanceProps = {
    data: CardInformationType
    onNextChange?: (
        values: FormModel,
        formName: string,
        setSubmitting: (isSubmitting: boolean) => void
    ) => void
    onBackChange?: () => void
    currentStepStatus?: string
}

const NumericFormatInput = ({
    onValueChange,
    ...rest
}: Omit<NumericFormatProps, 'form'> & {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    form: any
    field: FieldInputProps<unknown>
}) => {
    return (
        <NumericFormat
            customInput={Input as ComponentType}
            type="text"
            autoComplete="off"
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

const CardBalanceRecharge = ({
    data,
    onNextChange,
    onBackChange,
    currentStepStatus,
}: CardBalanceProps) => {
    const onNext = (
        values: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        onNextChange?.(values, 'cardInformation', setSubmitting)
    }

    const onBack = () => {
        onBackChange?.()
    }

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Ricarica carta</h3>
                <p>Inserisci il credito iniziale dell&apos;utente.</p>
            </div>
            <Formik
                enableReinitialize
                initialValues={data}
                validationSchema={cardInfoValidator}
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
                                <h5 className="mb-4">Ricarica carta</h5>
                                <div className="md:grid grid-cols-10 gap-4">
                                    <FormItem
                                        label="Importo"
                                        invalid={
                                            (errors.balance &&
                                                touched.balance) as boolean
                                        }
                                        errorMessage={errors.balance}
                                    >
                                        <Field name="balance">
                                            {({ field, form }: FieldProps) => {
                                                return (
                                                    <FormNumericInput
                                                        placeholder="Importo"
                                                        className="text-center text-lg w-[200px]"
                                                        suffix=" €"
                                                        valueIsNumericString={
                                                            true
                                                        }
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

export default CardBalanceRecharge
