import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Bentornato!</h3>
                <p>Inserisci le tue credenziali per effetturare l'accesso!</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
