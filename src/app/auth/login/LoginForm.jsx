"use client";

import { useState } from "react";
import {
    Card,
    Button,
    Link,
    TextField,
    Label,
    InputGroup,
    Input,
} from "@heroui/react";

import {
    Eye,
    EyeSlash,
    At,
    ShieldKeyhole,
} from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginForm({ redirectTo = "/" }) {
    // Form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // UI states
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();
    const toggleVisibility = () => setIsVisible((prev) => !prev);

    // Standard Credentials Handler
    const handleSignin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const { error: authError } = await authClient.signIn.email({
                email,
                password,
            });

            if (authError) {
                setError(authError.message || "Invalid email or password.");
                return;
            }

            setSuccess("Signed in successfully! Accessing portal...");
            setEmail("");
            setPassword("");

            router.push(redirectTo);
        } catch (err) {
            console.error(err);
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    // Google SSO Handler
    const handleGoogleSignIn = async () => {
        setError("");
        setIsGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: redirectTo
            });
        } catch (err) {
            console.error(err);
            setError("Failed to initialize Google authentication.");
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="flex min-h-[60vh] items-center justify-center bg-[#f8f9ff] dark:bg-[#233143] py-10 px-4 font-manrope transition-colors duration-200">
            <Card className="w-full max-w-lg p-5 sm:p-7 rounded-[2.5rem] bg-white dark:bg-[#002b5c] shadow-[0_15px_40px_rgba(0,63,131,0.05)] border border-[#c2c6d3]/30 dark:border-white/5">

                {/* Header Section */}
                <div className="flex flex-col items-center justify-center gap-2 pb-6 text-center">
                    <h1 className="text-[24px] sm:text-[30px] font-bold tracking-tight text-[#00234a] dark:text-[#fff]">
                        Login to Your Account
                    </h1>
                    <p className="text-sm text-[#575f69] dark:text-[#bfc7d3]">
                        Welcome back! Please enter your details.
                    </p>
                </div>

                <form onSubmit={handleSignin} className="flex flex-col gap-5 mt-4">

                    {/* Email Input Field */}
                    <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-[700] uppercase tracking-wider text-[#00234a]/70 dark:text-white/70">
                            Email Address
                        </Label>
                        <InputGroup className="flex items-center gap-2 border border-[#c2c6d3]/60 dark:border-white/10 rounded-xl px-3 bg-zinc-50/50 dark:bg-[#001f42] focus-within:border-[#0052ad] transition-colors">
                            <At className="text-zinc-400 dark:text-zinc-500 shrink-0" size={16} />
                            <Input
                                placeholder="sarah@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent py-2.5 text-[15px] font-[500] outline-none border-none text-[#00234a] dark:text-[#fff]"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Password Input Field */}
                    <TextField isRequired name="password" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-[700] uppercase tracking-wider text-[#00234a]/70 dark:text-white/70">
                            Password
                        </Label>
                        <InputGroup className="flex items-center gap-2 border border-[#c2c6d3]/60 dark:border-white/10 rounded-xl px-3 bg-zinc-50/50 dark:bg-[#001f42] focus-within:border-[#0052ad] transition-colors">
                            <ShieldKeyhole className="text-zinc-400 dark:text-zinc-500 shrink-0" size={16} />
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-2.5 text-[15px] font-[500] outline-none border-none text-[#00234a] dark:text-[#fff]"
                            />
                            <button
                                type="button"
                                onClick={toggleVisibility}
                                className="focus:outline-none text-zinc-400 hover:text-[#0052ad] dark:hover:text-[#abc7ff] transition px-1"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </InputGroup>
                    </TextField>

                    {/* Status Feedback Banners */}
                    {error && (
                        <div className="p-3.5 text-xs font-semibold rounded-xl bg-red-100/60 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40">
                            Error: {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3.5 text-xs font-semibold rounded-xl bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40">
                            Success: {success}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-14 rounded-xl font-[700] text-[16px] bg-[#003f83] dark:bg-[#b7ceff] text-white dark:text-[#00234a] hover:opacity-95 shadow-md transition-all active:scale-[0.99]"
                        isLoading={isLoading}
                        isDisabled={isLoading || isGoogleLoading}
                    >
                        Log In
                    </Button>

                    {/* OR Splitter Section */}
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-[#c2c6d3]/30 dark:border-white/10"></div>
                        <span className="flex-shrink mx-4 text-[11px] font-[700] tracking-wider text-[#575f69]/60 dark:text-[#bfc7d3]/50 uppercase">
                            OR
                        </span>
                        <div className="flex-grow border-t border-[#c2c6d3]/30 dark:border-white/10"></div>
                    </div>

                    {/* Google OAuth Custom Button */}
                    <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        isLoading={isGoogleLoading}
                        isDisabled={isLoading || isGoogleLoading}
                        className="w-full h-14 rounded-xl font-[700] text-[15px] bg-transparent hover:bg-zinc-50 dark:hover:bg-white/5 text-[#00234a] dark:text-[#fff] border border-[#c2c6d3] dark:border-white/10 transition-all"
                    >
                        {!isGoogleLoading && (
                            <svg className="mr-2 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        )}
                        Log In with Google Account
                    </Button>

                    {/* Redirection Link Block */}
                    <div className="text-center pt-4 border-t border-[#c2c6d3]/20 dark:border-white/5 text-[14px] font-[500] text-[#575f69] dark:text-[#bfc7d3]">
                        Don't have an active healthcare profile?{" "}
                        <Link
                            href={`/auth/register?redirect=${encodeURIComponent(redirectTo)}`}
                            className="font-[700] text-[#0052ad] dark:text-[#abc7ff] hover:underline cursor-pointer ml-1"
                        >
                            Create personal account
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}