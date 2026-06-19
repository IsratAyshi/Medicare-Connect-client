import React from 'react';
import SignupForm from './SignupForm';

const RegisterPage = async ({ searchParams }) => {
    // Await searchParams as required by Next.js App Router rules
    const params = await searchParams;
    const redirectTo = params?.redirect ?? "/";

    return (
        <main className="w-full mt-20 min-h-[80vh] bg-[#f8f9ff] dark:bg-[#001f42] transition-colors duration-200">
            <SignupForm redirectTo={redirectTo} />
        </main>
    );
};

export default RegisterPage;