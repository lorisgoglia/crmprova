import dayjs from 'dayjs'

const get18yearsOldAgeDate = () => dayjs().subtract(18, 'year').format()

export { get18yearsOldAgeDate }
