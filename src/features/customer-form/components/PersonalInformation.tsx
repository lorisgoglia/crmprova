import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import DatePicker from '@/components/ui/DatePicker'
import Select from '@/components/ui/Select'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, Form, Formik } from 'formik'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { countryList } from '@/constants/countries-it.constant'
import * as Yup from 'yup'
import type { FieldInputProps, FieldProps } from 'formik'
import type { PersonalInformation as PersonalInformationType } from '../store'
import type { ComponentType } from 'react'
import type { InputProps } from '@/components/ui/Input'
import 'dayjs/locale/it'
import { personalInfoValidator } from '@/features/customer-form/models/validators/customer-validator'

type FormModel = PersonalInformationType

type PersonalInformationProps = {
    data: PersonalInformationType
    onNextChange?: (
        values: FormModel,
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

const NumberInput = (props: InputProps) => {
    return <Input {...props} value={props.field.value} />
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

const PersonalInformation = ({
    data = {
        firstName: '',
        lastName: '',
        email: '',
        nationality: '',
        phoneNumber: '',
        taxCode: '',
        dob: '',
        gender: '',
    },
    onNextChange,
    currentStepStatus,
}: PersonalInformationProps) => {
    const onNext = (
        values: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        onNextChange?.(values, 'personalInformation', setSubmitting)
    }

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Informazioni Personali</h3>
                <p>Informazioni base per l&apos;apertura di un account</p>
            </div>
            <Formik
                initialValues={data}
                enableReinitialize={true}
                validationSchema={personalInfoValidator}
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
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Nome"
                                        invalid={
                                            errors.firstName &&
                                            touched.firstName
                                        }
                                        errorMessage={errors.firstName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="firstName"
                                            placeholder="Nome"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Cognome"
                                        invalid={
                                            errors.lastName && touched.lastName
                                        }
                                        errorMessage={errors.lastName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Cognome"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Sesso"
                                        invalid={
                                            errors.gender && touched.gender
                                        }
                                        errorMessage={errors.gender}
                                    >
                                        <Field name="gender">
                                            {({ field, form }: FieldProps) => (
                                                <Select
                                                    id="sex_select"
                                                    placeholder="Sesso"
                                                    field={field}
                                                    form={form}
                                                    options={genderOptions}
                                                    value={genderOptions.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.gender
                                                    )}
                                                    onChange={(gender) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            gender?.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label="Data di nascità"
                                        invalid={errors.dob && touched.dob}
                                        errorMessage={errors.dob}
                                    >
                                        <Field
                                            name="dob"
                                            placeholder="Data di nascità"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <>
                                                    <DatePicker
                                                        field={field}
                                                        form={form}
                                                        value={
                                                            field.value &&
                                                            field.value != ''
                                                                ? new Date(
                                                                      field.value
                                                                  )
                                                                : null
                                                        }
                                                        inputFormat={'L'}
                                                        onChange={(date) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                date
                                                            )
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </Field>
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Nazionalità"
                                        invalid={
                                            errors.nationality &&
                                            touched.nationality
                                        }
                                        errorMessage={errors.nationality}
                                    >
                                        <Field name="nationality">
                                            {({ field, form }: FieldProps) => (
                                                <Select
                                                    placeholder="Nazionalità"
                                                    field={field}
                                                    form={form}
                                                    options={countryList}
                                                    value={countryList.filter(
                                                        (country) =>
                                                            country.value ===
                                                            values.nationality
                                                    )}
                                                    onChange={(country) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            country?.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label="Codice Fiscale"
                                        invalid={
                                            errors.taxCode && touched.taxCode
                                        }
                                        errorMessage={errors.taxCode}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="taxCode"
                                            placeholder="Codice Fiscale"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>

                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Email"
                                        invalid={errors.email && touched.email}
                                        errorMessage={errors.email}
                                    >
                                        <Field
                                            type="email"
                                            autoComplete="off"
                                            name="email"
                                            placeholder="Email"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Numero di telefono"
                                        invalid={
                                            errors.phoneNumber &&
                                            touched.phoneNumber
                                        }
                                        errorMessage="Numero di telefono obbligatorio"
                                    >
                                        <Field name="phoneNumber">
                                            {({ field, form }: FieldProps) => {
                                                return (
                                                    <NumericFormatInput
                                                        form={form}
                                                        field={field}
                                                        customInput={
                                                            NumberInput as ComponentType
                                                        }
                                                        placeholder="Numero di telefono"
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

export default PersonalInformation
