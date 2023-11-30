import * as Yup from 'yup'

const personalInfoValidator = Yup.object().shape({
    first_name: Yup.string().required('Nome obbligatorio.'),
    last_name: Yup.string().required('Cognome obbligatorio.'),
    email: Yup.string()
        .email('Email invalida. ( Es: nome@email.com )')
        .required('Email obbligatoria.'),
    country: Yup.string().required('Nazionalità obbligatoria.'),
    phone_number: Yup.string()
        .min(8)
        .max(10)
        .required('Numero di telefono obbligatorio.'),
    dob: Yup.string().required('Data di nascità obbligatoria.'),
    tax_code: Yup.string()
        .length(16, 'Il codice fiscale deve contenere 16 caratteri.')
        .required('Codice Fiscale obbligatorio.'),
    sex: Yup.string().required('Genere obbligatorio.'),
})

const addressInfoValidator = Yup.object().shape({
    country: Yup.string().required('Stato obbligatorio.'),
    address: Yup.string().required('Indirizzo obbligatorio.'),
    city: Yup.string().required('Città obbligatoria.'),
    zipCode: Yup.string()
        .length(5, 'Il CAP deve contenere 5 caratteri.')
        .required('CAP obbligatorio.'),
})

const cardBalanceValidator = Yup.object().shape({
    amount: Yup.number(),
})

export { personalInfoValidator, addressInfoValidator, cardBalanceValidator }
