import { Button, Dialog, Notification, toast } from '@/components/ui'
import { useCallback, useEffect, useReducer, useState } from 'react'
import {
    ClinicalInformation,
    Measurements,
    UserData,
} from '@/services/models/users'
import { FormNumericInput } from '@/components/shared'
import {
    apiGetClinicalinfo,
    apiManageClinicalInfo,
} from '@/services/CustomerService'
import ClinicalInfoForm from '@/features/customers/components/detail/ClinicalInfoForm'
import { CustomerMeasurementsTable } from '@/features/customers/components/CustomerMeasurementsTable'
import { FormikErrors, FormikTouched } from 'formik'
import { FormModel } from '@/features/customers/components/detail/CustomerForm'
import { handleError } from '@/features/new-customer/utils/errorHandling'
import { AxiosError } from 'axios'

type CustomerClinicalInfoProps = {
    customer: UserData
    touched: FormikTouched<FormModel>
    errors: FormikErrors<FormModel>
    values: FormModel
    setValues: (values: any) => void
}

interface MeasurementState {
    body_fat: number
    lean_mass: number
    body_mass_index: number
    weights: number
    body_fluids: number
    basal_metabolism: number
}

type ActionType = { type: 'SET_STATE'; field: string; value: number }

const initialState: MeasurementState = {
    body_fat: 0,
    lean_mass: 0,
    body_fluids: 0,
    weights: 0,
    body_mass_index: 0,
    basal_metabolism: 0,
}

const reducer = (
    state: MeasurementState,
    action: ActionType
): MeasurementState => {
    switch (action.type) {
        case 'SET_STATE':
            return { ...state, [action.field]: action.value }
        default:
            return state
    }
}

export const CustomerClinicalInfo = ({
    customer,
    touched,
    errors,
    values,
    setValues,
}: CustomerClinicalInfoProps) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [clinicalInfo, setClinicalInfo] = useState<ClinicalInformation>()
    const [measurements, setMeasurements] = useState<Measurements[]>([])

    const [measurementState, dispatch] = useReducer(reducer, initialState)

    const measurementFields = [
        {
            label: 'Massa grassa',
            type: 'body_fat',
            state: measurementState.body_fat,
            suffix: ' kg',
        },
        {
            label: 'Massa magra',
            type: 'lean_mass',
            state: measurementState.lean_mass,
            suffix: ' kg',
        },
        {
            label: 'Liquidi corporei',
            type: 'body_fluids',
            state: measurementState.body_fluids,
            suffix: ' L',
        },
        {
            label: 'Peso',
            type: 'weights',
            state: measurementState.weights,
            suffix: ' kg',
        },
        {
            label: 'BMI',
            type: 'body_mass_index',
            state: measurementState.body_mass_index,
            suffix: '',
        },
        {
            label: 'Metabolismo Basale',
            type: 'basal_metabolism',
            state: measurementState.basal_metabolism,
            suffix: '',
        },
    ]

    const setMeasurementState = (field: string, value: number) => {
        dispatch({ type: 'SET_STATE', field, value })
    }

    const getClinicalInfo = useCallback(() => {
        setIsLoading(true)
        apiGetClinicalinfo({
            user_id: customer.user.id,
        })
            .then(({ status, data }) => {
                setIsLoading(false)
                if (status >= 200) {
                    const measurementsMap = mapMeasurements(data)
                    setClinicalInfo(data)
                    setValues({ ...values, ...data })
                    setMeasurements(measurementsMap)
                }
            })
            .catch(() => setIsLoading(false))
    }, [customer.user.id])

    const mapMeasurements = (clinicalInfo: ClinicalInformation) => {
        const weight = clinicalInfo.weights_measurements ?? []
        const lean_mass = clinicalInfo.lean_mass_measurements ?? []
        const body_fat = clinicalInfo.body_fat_measurements ?? []
        const body_mass_index = clinicalInfo.body_mass_index_measurements ?? []
        const body_fluids = clinicalInfo.body_fluids_measurements ?? []
        const basal_metabolism = clinicalInfo.basal_metabolism ?? []

        // TODO: sort by date
        return lean_mass!.map(
            (v, i): Measurements => ({
                lean_mass: v,
                weight: weight[i],
                body_fat: body_fat[i],
                body_mass_index: body_mass_index[i],
                body_fluids: body_fluids[i],
                basal_metabolism: basal_metabolism[i],
            })
        )
    }

    useEffect(() => {
        getClinicalInfo()
    }, [])

    const handleSubmit = async () => {
        const nonZeroMeasurements = measurementFields.filter(
            (field) => field.state !== 0
        )

        if (nonZeroMeasurements.length === 0) {
            return
        }

        setIsLoading(true)
        const data = {
            id: customer.user.id,
            measurements: nonZeroMeasurements.map((field) => ({
                measurement_type: field.type.toLowerCase(),
                value: field.state,
            })),
        }

        await apiManageClinicalInfo(data)
            .then(({ status }) => {
                if (status >= 200) {
                    toast.push(
                        <Notification title={'Aggiornato'} type={'success'}>
                            Misurazioni aggiornate con successo!
                        </Notification>
                    )
                    getClinicalInfo()
                    cleanMeasurementState()
                    handleClose()
                }
            })
            .catch((error: AxiosError) => {
                const { title, message } = handleError(error)
                toast.push(
                    <Notification title={title} type={'danger'}>
                        {message}
                    </Notification>
                )
            })
            .finally(() => setIsLoading(false))
    }

    const cleanMeasurementState = () => {
        measurementFields.forEach((m) => setMeasurementState(m.type, 0))
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <ClinicalInfoForm touched={touched} errors={errors} />
            <CustomerMeasurementsTable
                measurements={measurements}
                isLoading={isLoading}
                handleOpen={() => setOpen(true)}
            />
            <Dialog
                isOpen={open}
                width={600}
                onRequestClose={handleClose}
                onClose={handleClose}
            >
                <h4>Aggiorna misurazioni</h4>
                <div className="grid grid-cols-2 gap-4">
                    {measurementFields.map((field, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center m-6"
                        >
                            <div className="text-left ">
                                <h6 className="mb-1">{field.label}</h6>
                                <FormNumericInput
                                    placeholder={`0${field.suffix}`}
                                    className="text-center text-lg"
                                    suffix={field.suffix}
                                    decimalScale={2}
                                    value={field.state}
                                    onValueChange={(e) => {
                                        setMeasurementState(
                                            field.type,
                                            e.floatValue!
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <Button
                    block
                    loading={isLoading}
                    className="mt-6"
                    variant="solid"
                    onClick={handleSubmit}
                >
                    Aggiorna
                </Button>
            </Dialog>
        </>
    )
}
