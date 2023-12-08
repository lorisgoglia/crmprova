import DatePicker from '@/components/ui/DatePicker'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import {
    HiUserCircle,
    HiMail,
    HiLocationMarker,
    HiPhone,
    HiCake,
} from 'react-icons/hi'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'
import { FormModel } from '@/features/customers/components/detail'

type PersonalInfoFormProps = {
    touched: FormikTouched<FormModel>
    errors: FormikErrors<FormModel>
}

const PersonalInfoForm = (props: PersonalInfoFormProps) => {
    const { touched, errors } = props

    return (
        <>
            {/*<FormItem
                invalid={errors.upload && touched.upload}
                errorMessage={errors.upload}
            >
                <Field name="img">
                    {({ field, form }: FieldProps) => {
                        const avatarProps = field.value
                            ? { src: field.value }
                            : {}
                        return (
                            <div className="flex justify-center">
                                <Upload
                                    className="cursor-pointer"
                                    showList={false}
                                    uploadLimit={1}
                                    onChange={(files) =>
                                        form.setFieldValue(
                                            field.name,
                                            URL.createObjectURL(files[0])
                                        )
                                    }
                                    onFileRemove={(files) =>
                                        form.setFieldValue(
                                            field.name,
                                            URL.createObjectURL(files[0])
                                        )
                                    }
                                >
                                    <Avatar
                                        className="border-2 border-white dark:border-gray-800 shadow-lg"
                                        size={100}
                                        shape="circle"
                                        icon={<HiOutlineUser />}
                                        {...avatarProps}
                                    />
                                </Upload>
                            </div>
                        )
                    }}
                </Field>
            </FormItem>*/}
            <FormItem
                label="Nome"
                invalid={errors.firstName && touched.firstName}
                errorMessage={errors.firstName}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="firstName"
                    placeholder="Nome"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Cognome"
                invalid={errors.lastName && touched.lastName}
                errorMessage={errors.lastName}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="lastName"
                    placeholder="Cognome"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
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
                    prefix={<HiMail className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Indirizzo"
                invalid={errors.address && touched.address}
                errorMessage={errors.address}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="address"
                    placeholder="Indirizzo"
                    component={Input}
                    prefix={<HiLocationMarker className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Numero di telefono"
                invalid={errors.phoneNumber && touched.phoneNumber}
                errorMessage={errors.phoneNumber}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="phoneNumber"
                    placeholder="Numero di telefono"
                    component={Input}
                    prefix={<HiPhone className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Data di nascità"
                invalid={(errors.dob && touched.dob) as boolean}
                errorMessage={errors.dob as string}
            >
                <Field name="dob" placeholder="Data di nascità">
                    {({ field, form }: FieldProps) => (
                        <DatePicker
                            field={field}
                            form={form}
                            value={
                                field.value && field.value != ''
                                    ? new Date(field.value)
                                    : null
                            }
                            inputPrefix={<HiCake className="text-xl" />}
                            inputFormat={'L'}
                            onChange={(date) => {
                                form.setFieldValue(field.name, date)
                            }}
                        />
                    )}
                </Field>
            </FormItem>
        </>
    )
}

export default PersonalInfoForm
