interface ClinicalInformation {
    height?: number | null
    age?: number | null
    profession?: string | null
    extra_work_activities?: string | null
    practiced_sports?: string | null
    injuries?: string | null
    diseases?: string | null
    /*cardiac_pressure?: string | null*/
    lean_mass_measurements?: Measurement[] | []
    weights_measurements?: Measurement[] | []
    body_fat_measurements?: Measurement[] | []
    body_fluids_measurements?: Measurement[] | []
    body_mass_index_measurements?: Measurement[] | []
    basal_metabolism?: Measurement[] | []
}

interface Measurements {
    lean_mass: Measurement
    weight: Measurement
    body_fat: Measurement
    body_fluids: Measurement
    body_mass_index: Measurement
    basal_metabolism: Measurement
}
interface Measurement {
    date: string
    value: number
}

interface Movement {
    id: number
    quantity: string
    description: string
    date: string
    movement_type: string
    payment_method: string
    card: number
    subject_profile: number
}

interface User {
    id: number
    password: string
    last_login: string
    username: string
    first_name: string
    last_name: string
    email: string
    is_active: boolean
    date_joined: string
}

interface Card {
    id: number
    img: string | null
    balance: number
    deleted_user_tax_code: string | null
}

interface Profile {
    phone_number: string
    tax_code: string
    sex: string
    dob: string
    address: string
    country: string
    city: string
    zip_code: string
    img: string | null
}

interface UserData {
    is_vip: boolean
    profile: Profile
    user: User
    card: Card
}

export {
    UserData,
    Profile,
    Card,
    User,
    Movement,
    ClinicalInformation,
    Measurements,
}
