import { Provider } from 'react-redux'
import KycForm from '../../src/features/new-customer-form/KycForm'
import store from '../../src/store'
import { BrowserRouter } from 'react-router-dom'
import Theme from '../../src/components/template/Theme'
import 'tailwindcss/tailwind.css'
import '../../src/index.css'
import { locators } from '../support/features/KycForm/kyc-form-utilities'
import { customer } from '../fixtures/features/KycForm/customer'

const {
    firstName,
    lastName,
    email,
    dialCode,
    nationality,
    taxCode,
    dob,
    phoneNumber,
    gender,
} = locators

describe('<KycForm />', () => {
    it('mount without any errors', () => {
        cy.mount(
            <Provider store={store}>
                <BrowserRouter>
                    <Theme>
                        <KycForm />
                    </Theme>
                </BrowserRouter>
            </Provider>
        )
    })

    it('fill the form without errors', () => {
        cy.mount(
            <Provider store={store}>
                <BrowserRouter>
                    <Theme>
                        <KycForm />
                    </Theme>
                </BrowserRouter>
            </Provider>
        )

        cy.get(firstName).type(customer.first_name)
        cy.get(lastName).type(customer.last_name)
        cy.get(email).type(customer.email)
        /*cy.get(dialCode).select(customer.first_name)*/
        /*cy.get(nationality).select(customer.country)
        cy.get(taxCode).type(customer.tax_code)
        cy.get(dob).type(customer.dob)
        cy.get(phoneNumber).type('3287817793')*/
        cy.get(gender).click().get('.react-select__menu')
    })
})
