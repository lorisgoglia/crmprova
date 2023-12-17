import DatePicker from '@/components/ui/DatePicker'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'
import { FormModel } from '@/features/customers/components/detail'
import { FormNumericInput } from '@/components/shared'

type ClinicalInfoFormProps = {
    touched: FormikTouched<FormModel>
    errors: FormikErrors<FormModel>
}

const ClinicalInfoForm = (props: ClinicalInfoFormProps) => {
    const { touched, errors } = props

    return (
        <>
            <div className="md:grid grid-cols-2 gap-4">
                <FormItem
                    label="Altezza (cm)"
                    invalid={(errors.height && touched.height) as boolean}
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
                                        form.setFieldValue(field.name, e.value)
                                    }}
                                />
                            )
                        }}
                    </Field>
                </FormItem>
                <FormItem
                    label="Età"
                    invalid={(errors.age && touched.age) as boolean}
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
                                        form.setFieldValue(field.name, e.value)
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
                        (errors.profession && touched.profession) as boolean
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
                    errorMessage={errors.extra_work_activities}
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
                    invalid={(errors.injuries && touched.injuries) as boolean}
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
                    invalid={(errors.diseases && touched.diseases) as boolean}
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
        </>
    )
}

export default ClinicalInfoForm
