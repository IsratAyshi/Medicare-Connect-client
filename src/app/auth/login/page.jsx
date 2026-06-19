import React from 'react';
import LoginForm from './LoginForm';

const LoginPage = async ({ searchParams }) => {
    const params = await searchParams;
    const redirectTo = params?.redirect ?? "/";

    return (
        <main className="w-full mt-20 min-h-[80vh] bg-[#f8f9ff] dark:bg-[#001f42] transition-colors duration-200">
            <LoginForm redirectTo={redirectTo} />
        </main>
    );
};

export default LoginPage;