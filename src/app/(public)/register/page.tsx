import RegisterForm from '@/components/RegisterForm/RegisterForm';

export default function Register() {
    return (
        <main className="min-h-screen grid grid-cols-[1fr,40rem,1fr] items-center justify-center">
            <div className="col-start-2">
                <RegisterForm />
            </div>
        </main>
    );
}
