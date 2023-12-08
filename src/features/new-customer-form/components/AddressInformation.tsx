import { useCallback } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, Form, Formik } from 'formik'
import get from 'lodash/get'
import { countryList } from '@/constants/countries-it.constant'
import type { FieldProps, FormikTouched, FormikErrors } from 'formik'
import FormPatternInput from '../../../components/shared/FormPatternInput'
import { AddressInformationType } from '@/features/new-customer-form/utils/addressInformationUtils'
import { addressInfoValidator } from '@/features/new-customer-form/models/validators/customer-validator'

type FormModel = AddressInformationType

type AddressInfomationProps = {
    data: AddressInformationType
    onNextChange?: (
        values: FormModel,
        formName: string,
        setSubmitting: (isSubmitting: boolean) => void
    ) => void
    onBackChange?: () => void
    currentStepStatus?: string
}

type AddressFormProps = {
    values: FormModel
    touched: FormikTouched<FormModel>
    errors: FormikErrors<FormModel>
}

const AddressForm = (props: AddressFormProps) => {
    const { values, touched, errors } = props

    const getError = useCallback(
        (name: string) => {
            return get(errors, name)
        },
        [errors]
    )

    const getTouched = useCallback(
        (name: string) => {
            return get(touched, name)
        },
        [touched]
    )

    return (
        <>
            <div className="md:grid grid-cols-2 gap-4">
                <FormItem
                    label="Stato"
                    invalid={getError('country') && getTouched('country')}
                    errorMessage={getError('country')}
                >
                    <Field name={'country'}>
                        {({ field, form }: FieldProps) => (
                            <Select
                                placeholder="Stato"
                                field={field}
                                form={form}
                                options={countryList}
                                value={countryList.filter(
                                    (c) => c.value === get(values, 'country')
                                )}
                                onChange={(c) =>
                                    form.setFieldValue(field.name, c?.value)
                                }
                            />
                        )}
                    </Field>
                </FormItem>
                <FormItem
                    label="Città"
                    invalid={getError('city') && getTouched('city')}
                    errorMessage={getError('city')}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name={'city'}
                        placeholder="Città"
                        component={Input}
                    />
                </FormItem>
            </div>
            <div className="md:grid grid-cols-2 gap-4">
                <FormItem
                    label="Indirizzo"
                    invalid={getError('address') && getTouched('address')}
                    errorMessage={getError('address')}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name={'address'}
                        placeholder="Indirizzo"
                        component={Input}
                    />
                </FormItem>
                <FormItem
                    label="CAP"
                    invalid={getError('zip_code') && getTouched('zip_code')}
                    errorMessage={getError('zip_code')}
                >
                    <Field name={'zip_code'}>
                        {({ field, form }: FieldProps) => {
                            return (
                                <FormPatternInput
                                    form={form}
                                    field={field}
                                    value={field.value}
                                    placeholder="CAP"
                                    format="#####"
                                    onValueChange={(e) => {
                                        form.setFieldValue(field.name, e.value)
                                    }}
                                />
                            )
                        }}
                    </Field>
                </FormItem>
            </div>
        </>
    )
}

const AddressInformation = ({
    data,
    onNextChange,
    onBackChange,
    currentStepStatus,
}: AddressInfomationProps) => {
    const onNext = (
        values: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        onNextChange?.(values, 'addressInformation', setSubmitting)
    }

    const onBack = () => {
        onBackChange?.()
    }

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Indirizzo</h3>
                <p>Inserisci l&apos;indirizzo dell&apos;utente.</p>
            </div>
            <Formik
                enableReinitialize
                initialValues={data}
                validationSchema={addressInfoValidator}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onNext(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    const formProps = { values, touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                                <h5 className="mb-4">Indirizzo</h5>
                                <AddressForm {...formProps} />
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

export default AddressInformation
