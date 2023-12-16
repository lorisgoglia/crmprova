import { AxiosError } from 'axios'
import i18n from 'i18next'

const handleError = (error: AxiosError): { title: string; message: string } => {
    const { response } = error
    const data = response?.data as any

    if (data)
        if ('email' in data) {
            return {
                title: i18n.t('errors.email.duplicate.title'),
                message: i18n.t('errors.email.duplicate.message'),
            }
        }

    return {
        title: i18n.t('errors.generic.title'),
        message: i18n.t('errors.generic.message'),
    }
}

export { handleError }
