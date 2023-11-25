import Input, { InputProps } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, FieldInputProps, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { CardBalance } from '../store'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { ComponentType } from 'react'

type FormModel = CardBalance

type CardBalanceProps = {
    data: CardBalance
    onNextChange?: (
        values: FormModel,
        formName: string,
        setSubmitting: (isSubmitting: boolean) => void
    ) => void
    onBackChange?: () => void
    currentStepStatus?: string
}

const validationSchema = Yup.object().shape({
    cardBalance: Yup.number(),
})

const AmountInput = (props: InputProps) => {
    return <Input {...props} value={props.field.value} prefix="€" />
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
    data = {
        amount: 0,
    },
    onNextChange,
    onBackChange,
    currentStepStatus,
}: CardBalanceProps) => {
    const onNext = (
        values: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        onNextChange?.(values, 'cardBalance', setSubmitting)
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
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onNext(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <h5 className="mb-4">Ricarica carta</h5>
                                <div className="md:grid grid-cols-10 gap-4">
                                    <FormItem
                                        label="Importo"
                                        invalid={
                                            (errors.amount &&
                                                touched.amount) as boolean
                                        }
                                        errorMessage={errors.amount}
                                    >
                                        <Field name="amount">
                                            {({ field, form }: FieldProps) => {
                                                return (
                                                    <NumericFormatInput
                                                        form={form}
                                                        field={field}
                                                        placeholder="Importo"
                                                        customInput={
                                                            AmountInput as ComponentType
                                                        }
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
