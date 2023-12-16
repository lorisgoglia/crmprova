import { useCallback } from 'react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Field } from 'formik'
import get from 'lodash/get'
import { countryList } from '@/constants/countries-it.constant'
import type { FieldProps, FormikTouched, FormikErrors } from 'formik'
import FormPatternInput from '../../../components/shared/FormPatternInput'
import { FormData } from '@/features/new-collaborator/store'

type AddressFormProps = {
    values: FormData
    touched: FormikTouched<FormData>
    errors: FormikErrors<FormData>
}

const AddressInformation = (props: AddressFormProps) => {
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
            <div className="mb-8">
                <h3 className="mb-2">Indirizzo</h3>
                <p>Inserisci l&apos;indirizzo dell&apos;utente.</p>
            </div>
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

export default AddressInformation
