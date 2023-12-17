interface ClinicalInformation {
    height?: number | null
    age?: number | null
    profession?: string | null
    extra_work_activities?: string | null
    practiced_sports?: string | null
    injuries?: string | null
    diseases?: string | null
    cardiac_pressure?: string | null
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

export { UserData, Profile, Card, User, Movement, ClinicalInformation }
