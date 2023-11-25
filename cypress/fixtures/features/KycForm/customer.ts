import { faker } from '@faker-js/faker'
export const customer = {
    email: faker.internet.email(),
    password1: faker.internet.password(),
    password2: faker.internet.password(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    sex: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
    dob: faker.date.past().toISOString().split('T')[0], // Format as YYYY-MM-DD
    tax_code: faker.random.alphaNumeric(16),
    address: faker.address.streetAddress(),
    country: faker.address.country(),
    city: faker.address.city(),
    zip_code: faker.address.zipCode(),
    card_balance: faker.finance.amount(),
    payment_method: faker.helpers.arrayElement(['Cash', 'Card']),
    movement_description: faker.lorem.words(),
}
