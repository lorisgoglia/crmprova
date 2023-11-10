export const AccountReviewTable = ({}) => {
    return (
        <div className="flex flex-col mt-4 gap-4">
            <address className="not-italic">
                <div>
                    <h5>Fabrizzio Maya Lopez</h5>
                    <span>Via Armando Diaz, 53A</span>
                    <br />
                    <span>Italia, Giussano 20833</span>
                    <br />
                    <abbr title="Phone">Telefono:</abbr>
                    <span>(+39) 3315045625</span>
                </div>
            </address>
            <div>
                <h5>Accessi applicazione mobile</h5>
                <div>
                    <b>Email:</b>
                    <p>mayalopezfabrizzio@gmail.com</p>
                </div>
                <div className="mt-2">
                    <b>Password:</b>
                    <p>XXXXXXXXXX12345678</p>
                </div>
            </div>
        </div>
    )
}
