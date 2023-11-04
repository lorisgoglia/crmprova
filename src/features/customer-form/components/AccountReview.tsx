import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { AccountReviewTable } from '@/features/customer-form/components/AccountReviewTable'
import { Button } from '@/components/ui'
import { useEffect } from 'react'

const css = `@page
                {
                    size: auto;   /* auto is the initial value */
                    margin: 0mm;  /* this affects the margin in the printer settings */
                }`

const AccountReview = () => {
    let timeoutID: any
    useEffect(() => {
        if (window.location.pathname === '/print') {
            timeoutID = setTimeout(() => {
                window.print()
            }, 1000)
        }

        return () => {
            clearTimeout(timeoutID)
            window.onafterprint = window.close
        }
    }, [])

    return (
        <div className="h-full flex flex-col">
            <style type="text/css" media="print">
                {css}
            </style>
            <DoubleSidedImage
                className="w-1/5"
                src="/img/logo/logo-dark-full.png"
                darkModeSrc="/img/logo/logo-dark-full.png"
                alt=""
            />
            <div className="flex mt-2">
                <div className="flex flex-col">
                    <h3 className="mb-4">Utente registrato!</h3>
                    <p>
                        L&apos;utente è stato registrato correttamente.
                        <br />
                        Stampa la registrazione, con tutti i dettagli
                        dell&apos;iscrizione e gli accessi all&apos;applicazione
                        mobile.
                    </p>
                </div>
            </div>
            <AccountReviewTable />
            <div className="print:hidden mt-6 flex items-center justify-between">
                <small className="italic">
                    La stampa è stata creata al computer ed è valida senza firma
                    o timbro.
                </small>
                <Button variant="solid" onClick={() => window.open('/print')}>
                    Print
                </Button>
            </div>
        </div>
    )
}

export default AccountReview
