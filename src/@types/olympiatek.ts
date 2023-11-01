export enum SexChoiceEnum {
    M = 'M',
    F = 'F',
    O = 'O',
}

export enum SexChoiceEnumKeys {
    MALE = 'M',
    FEMALE = 'F',
    OTHER = 'O',
}

export enum SexChoiceEnumValues {
    M = 'MALE',
    F = 'FEMALE',
    O = 'OTHER',
}

export interface CardSerializer {
    id?: number
    img?: File | null
    balance: number
}

export interface UserSerializer {
    id?: number
    password: string
    last_login?: string | null
    is_superuser?: boolean
    username: string
    first_name?: string
    last_name?: string
    email?: string
    is_staff?: boolean
    is_active?: boolean
    date_joined?: string
    sex: SexChoiceEnum
    dob: string
    address: string
    img?: File | null
    card: number | string
}
