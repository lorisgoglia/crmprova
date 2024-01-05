import { ClinicalInformation, Measurements } from '@/services/models/users'

const initialValue: ClinicalInformation = {
    height: 0,
    age: 0,
    profession: '',
    extra_work_activities: '',
    practiced_sports: '',
    injuries: '',
    diseases: '',
}

const mapMeasurements = (clinicalInfo: ClinicalInformation) => {
    const weight = clinicalInfo.weights_measurements ?? []
    const lean_mass = clinicalInfo.lean_mass_measurements ?? []
    const body_fat = clinicalInfo.body_fat_measurements ?? []
    const body_mass_index = clinicalInfo.body_mass_index_measurements ?? []
    const body_fluids = clinicalInfo.body_fluids_measurements ?? []
    const basal_metabolism = clinicalInfo.basal_metabolism ?? []

    const iterator =
        [
            weight,
            lean_mass,
            body_fat,
            body_mass_index,
            body_fluids,
            basal_metabolism,
        ].filter((a) => a.length > 0)[0] || []

    // TODO: sort by date
    return iterator.map(
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

const mapDataChart = (
    clinicalInformation: ClinicalInformation,
    measurement:
        | 'lean_mass_measurements'
        | 'weights_measurements'
        | 'body_fat_measurements'
        | 'body_fluids_measurements'
        | 'body_mass_index_measurements'
        | 'basal_metabolism'
) => {
    // Reverse because server is ordering from newest to oldest measurement
    return {
        series: [
            {
                name: 'Peso',
                data:
                    clinicalInformation[measurement]
                        ?.map((m) => m.value)
                        .reverse() || [],
            },
        ],
        categories: clinicalInformation[measurement]
            ?.map((m) => m.date)
            .reverse(),
    }
}

export { initialValue, mapMeasurements, mapDataChart }
