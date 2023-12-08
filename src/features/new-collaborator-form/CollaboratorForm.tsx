import { useEffect, lazy, Suspense, useState } from 'react'
import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import reducer, { useAppSelector, saveForm } from './store'
import { injectReducer } from '@/store'
import useQuery from '@/utils/hooks/useQuery'
import { Form, Formik } from 'formik'
import Button from '@/components/ui/Button'
import { collaboratorValidator } from '@/features/new-collaborator-form/models/validators/collaborator-validator'
import { FormContainer, toast, Notification } from '@/components/ui'
import { Profile, User } from '@/services/models/users'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { handleError } from '@/features/new-customer-form/utils/errorHandling'

injectReducer('collaboratorForm', reducer)

const PersonalInformation = lazy(
    () => import('./components/PersonalInformation')
)
const AddressInfomation = lazy(() => import('./components/AddressInformation'))

const CollaboratorForm = () => {
    const query = useQuery()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const formData = useAppSelector(
        (state) => state.collaboratorForm.data.formData
    )

    useEffect(() => {
        const id = query.get('id')
        /*return () => {
            dispatch(setClearForm())
        }*/
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (values: Partial<User & Profile>) => {
        setIsLoading(true)
        await saveForm(values)
            .then(({ status }) => {
                setIsLoading(false)
                if (status > 200) {
                    toast.push(
                        <Notification title={'Salvato'} type={'success'}>
                            Collaboratore creato con successo!
                        </Notification>
                    )
                    navigate(`/collaborators`)
                }
            })
            .catch((error: AxiosError) => {
                setIsLoading(false)
                const { title, message } = handleError(error)

                toast.push(
                    <Notification title={title} type={'danger'}>
                        {message}
                    </Notification>
                )
            })
    }

    return (
        <Container className="h-full">
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="grid lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-5 gap-4 h-full">
                    <div
                        className={'2xl:col-span-4 lg:col-span-3 xl:col-span-2'}
                    >
                        <Suspense fallback={<></>}>
                            <Formik
                                initialValues={formData}
                                enableReinitialize={true}
                                validationSchema={collaboratorValidator}
                                onSubmit={(values) => {
                                    handleSubmit(values).then()
                                }}
                            >
                                {({ values, touched, errors }) => {
                                    const formProps = {
                                        values,
                                        touched,
                                        errors,
                                    }

                                    return (
                                        <>
                                            <Form>
                                                <FormContainer>
                                                    <PersonalInformation
                                                        {...formProps}
                                                    />
                                                    <AddressInfomation
                                                        {...formProps}
                                                    />
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            loading={isLoading}
                                                            variant="solid"
                                                            type="submit"
                                                        >
                                                            Salva
                                                        </Button>
                                                    </div>
                                                </FormContainer>
                                            </Form>
                                        </>
                                    )
                                }}
                            </Formik>
                        </Suspense>
                    </div>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default CollaboratorForm
