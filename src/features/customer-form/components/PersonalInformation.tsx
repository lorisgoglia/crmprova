import Input from '@/components/ui/Input'
import InputGroup from '@/components/ui/InputGroup'
import Button from '@/components/ui/Button'
import DatePicker from '@/components/ui/DatePicker'
import Select from '@/components/ui/Select'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Field, Form, Formik } from 'formik'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { countryList } from '@/constants/countries.constant'
import { components } from 'react-select'
import dayjs from 'dayjs'
import * as Yup from 'yup'
import type { OptionProps, SingleValueProps } from 'react-select'
import type { FieldInputProps, FieldProps } from 'formik'
import type { PersonalInformation as PersonalInformationType } from '../store'
import type { ComponentType } from 'react'
import type { InputProps } from '@/components/ui/Input'

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

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

const { SingleValue } = components

const genderOptions = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Others', value: 'O' },
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

const PhoneSelectOption = ({
    innerProps,
    data,
    isSelected,
}: OptionProps<CountryOption>) => {
    return (
        <div
            className={`cursor-pointer flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                <span>
                    ({data.value}) {data.dialCode}
                </span>
            </div>
        </div>
    )
}

const PhoneControl = (props: SingleValueProps<CountryOption>) => {
    const selected = props.getValue()[0]
    return (
        <SingleValue {...props}>
            {selected && <span>{selected.dialCode}</span>}
        </SingleValue>
    )
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Nome obbligatorio.'),
    lastName: Yup.string().required('Cognome obbligatorio.'),
    email: Yup.string()
        .email('Email invalida. ( Es: nome@email.com )')
        .required('Email obbligatoria.'),
    nationality: Yup.string().required('Nazionalità obbligatoria.'),
    phoneNumber: Yup.string().required('Numero di telefono obbligatorio.'),
    dob: Yup.string().required('Data di nascità obbligatoria.'),
    gender: Yup.string().required('Sesso obbligatorio.'),
    dialCode: Yup.string().required('Codice telefonico obbligatorio.'),
})

const PersonalInformation = ({
    data = {
        firstName: '',
        lastName: '',
        email: '',
        nationality: '',
        dialCode: '',
        phoneNumber: '',
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
                                </div>
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
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Numero di telefono"
                                        invalid={
                                            (errors.dialCode &&
                                                touched.dialCode) ||
                                            (errors.phoneNumber &&
                                                touched.phoneNumber)
                                        }
                                        errorMessage="Numero di telefono obbligatorio"
                                    >
                                        <InputGroup>
                                            <Field name="dialCode">
                                                {({
                                                    field,
                                                    form,
                                                }: FieldProps) => (
                                                    <Select<CountryOption>
                                                        className="min-w-[130px]"
                                                        placeholder="Codice"
                                                        components={{
                                                            Option: PhoneSelectOption,
                                                            SingleValue:
                                                                PhoneControl,
                                                        }}
                                                        field={field}
                                                        form={form}
                                                        options={countryList}
                                                        value={countryList.filter(
                                                            (country) =>
                                                                country.value ===
                                                                values.dialCode
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
                                            <Field name="phoneNumber">
                                                {({
                                                    field,
                                                    form,
                                                }: FieldProps) => {
                                                    return (
                                                        <NumericFormatInput
                                                            form={form}
                                                            field={field}
                                                            customInput={
                                                                NumberInput as ComponentType
                                                            }
                                                            placeholder="Numero di telefono"
                                                            onValueChange={(
                                                                e
                                                            ) => {
                                                                form.setFieldValue(
                                                                    field.name,
                                                                    e.value
                                                                )
                                                            }}
                                                        />
                                                    )
                                                }}
                                            </Field>
                                        </InputGroup>
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
                                                <DatePicker
                                                    field={field}
                                                    form={form}
                                                    value={
                                                        field.value != ''
                                                            ? dayjs(
                                                                  field.value
                                                              ).toDate()
                                                            : null
                                                    }
                                                    inputFormat="DD-MM-YYYY"
                                                    onChange={(date) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            dayjs(date).format(
                                                                'DD-MM-YYYY'
                                                            )
                                                        )
                                                    }}
                                                />
                                            )}
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
