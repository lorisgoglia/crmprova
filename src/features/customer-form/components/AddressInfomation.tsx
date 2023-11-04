import { useCallback } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Select from '@/components/ui/Select'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, Form, Formik } from 'formik'
import get from 'lodash/get'
import { countryList } from '@/constants/countries.constant'
import * as Yup from 'yup'
import type { Address } from '../store'
import type { FieldProps, FormikTouched, FormikErrors } from 'formik'

type FormModel = Address

type AddressInfomationProps = {
    data: Address
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
    countryName: string
    addressName: string
    cityName: string
    stateName: string
    zipCodeName: string
}

const validationSchema = Yup.object().shape({
    country: Yup.string().required('Stato obbligatorio.'),
    address: Yup.string().required('Indirizzo obbligatorio.'),
    city: Yup.string().required('Città obbligatoria.'),
    zipCode: Yup.string().required('CAP obbligatorio.'),
})

const AddressForm = (props: AddressFormProps) => {
    const {
        values,
        touched,
        errors,
        countryName,
        addressName,
        cityName,
        zipCodeName,
    } = props

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
                    invalid={getError(countryName) && getTouched(countryName)}
                    errorMessage={getError(countryName)}
                >
                    <Field name={countryName}>
                        {({ field, form }: FieldProps) => (
                            <Select
                                placeholder="Stato"
                                field={field}
                                form={form}
                                options={countryList}
                                value={countryList.filter(
                                    (c) => c.value === get(values, countryName)
                                )}
                                onChange={(c) =>
                                    form.setFieldValue(field.name, c?.value)
                                }
                            />
                        )}
                    </Field>
                </FormItem>
                <FormItem
                    label="Indirizzo"
                    invalid={getError(addressName) && getTouched(addressName)}
                    errorMessage={getError(addressName)}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name={addressName}
                        placeholder="Indirizzo"
                        component={Input}
                    />
                </FormItem>
            </div>
            <div className="md:grid grid-cols-2 gap-4">
                <FormItem
                    label="Città"
                    invalid={getError(cityName) && getTouched(cityName)}
                    errorMessage={getError(cityName)}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name={cityName}
                        placeholder="Città"
                        component={Input}
                    />
                </FormItem>
            </div>
            <div className="md:grid grid-cols-2 gap-4">
                <FormItem
                    label="CAP"
                    invalid={getError(zipCodeName) && getTouched(zipCodeName)}
                    errorMessage={getError(zipCodeName)}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name={zipCodeName}
                        placeholder="CAP"
                        component={Input}
                    />
                </FormItem>
            </div>
        </>
    )
}

const AddressInfomation = ({
    data = {
        country: '',
        address: '',
        city: '',
        zipCode: '',
    },
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
                validationSchema={validationSchema}
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
                                <AddressForm
                                    countryName="country"
                                    addressName="address"
                                    cityName="city"
                                    stateName="state"
                                    zipCodeName="zipCode"
                                    {...formProps}
                                />
                                <div className="flex justify-end gap-2">
                                    <Button type="button" onClick={onBack}>
                                        Back
                                    </Button>
                                    <Button
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {currentStepStatus === 'complete'
                                            ? 'Save'
                                            : 'Next'}
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

export default AddressInfomation
