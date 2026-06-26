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
    Select,
    ListBox,
} from "@heroui/react";

import {
    Eye,
    EyeSlash,
    Person,
    At,
    ShieldKeyhole,
    Picture,
    Handset,
} from "@gravity-ui/icons";


import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignupForm({ redirectTo = "/" }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clinicRole, setClinicRole] = useState("Medical Specialist");
    const [gender, setGender] = useState("Male");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [phone, setPhone] = useState("");

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();
    const toggleVisibility = () => setIsVisible((prev) => !prev);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("Full representative name is required.");

            return;
        }
        if (!email.trim()) {
            setError("Email address is required.");
            return;
        }

        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>_]/.test(password);
        if (password.length < 6 || !hasNumber || !hasSpecial) {
            setError("Password must meet the safety policy requirements.");
            return;
        }

        setIsLoading(true);

        try {
            const { error: authError } = await authClient.signUp.email({
                email,
                password,
                name,
                accountRole: clinicRole.toLowerCase().replace(/\s+/g, "_"),
                gender: gender.toLowerCase(),
                image: avatarUrl || undefined,
                status: "active",
                phoneNumber: phone,
            });

            if (authError) {
                setError(authError.message || "Something went wrong during profile creation.");
                toast.error(authError.message || "Something went wrong during profile creation.");
                return;
            }

            setSuccess("Profile generated successfully!");
            toast.success("Profile generated successfully!");
            setName("");
            setEmail("");
            setPassword("");
            setAvatarUrl("");
            setPhone("");

            router.refresh();
            router.push(redirectTo);

        } catch (err) {
            console.error(err);
            setError("An unexpected network error occurred.");
            toast.error("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[60vh] items-center justify-center bg-[#f8f9ff] dark:bg-[#233143] py-8 px-4 font-manrope transition-colors duration-200">
            <Card className="w-full max-w-lg p-4 sm:p-6 rounded-[2.5rem] bg-white dark:bg-[#002b5c] shadow-[0_15px_40px_rgba(0,63,131,0.05)] border border-[#c2c6d3]/30 dark:border-white/5">

                <div className="flex flex-col items-center justify-center gap-2 pb-4 text-center">
                    <h1 className="text-[24px] sm:text-[30px] font-bold tracking-tight text-[#00234a] dark:text-[#fff]">
                        Create Your Profile
                    </h1>
                    <p className="text-sm text-[#575f69] dark:text-[#bfc7d3]">
                        Join families and verified medical providers today.
                    </p>
                </div>

                <form onSubmit={handleSignup} className="flex flex-col gap-5 mt-2">

                    {/* Full Name */}
                    <TextField isRequired name="name" className="flex flex-col gap-1.2">
                        <Label className="text-xs font-[700] uppercase tracking-wider text-[#00234a]/70 dark:text-white/70">
                            Full Name
                        </Label>
                        <InputGroup className="flex items-center gap-2 border border-[#c2c6d3]/60 dark:border-white/10 rounded-xl px-3 bg-[#f8f9ff] dark:bg-blue-900 focus-within:border-[#0052ad] transition-colors">
                            <Person className="text-zinc-400 dark:text-zinc-500 shrink-0" size={16} />
                            <Input
                                type="text"
                                placeholder="Sarah Doe, Dr Kabir"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent py-2.5 text-[15px] font-[500] outline-none border-none text-[#00234a] dark:text-[#fff] shadow-none"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Email Address */}
                    <TextField isRequired name="email" type="email" className="flex flex-col gap-1.2">
                        <Label className="text-xs font-[700] uppercase tracking-wider text-[#00234a]/70 dark:text-white/70">
                            Email Address
                        </Label>
                        <InputGroup className="flex items-center gap-2 border border-[#c2c6d3]/60 dark:border-white/10 rounded-xl px-3 bg-[#f8f9ff] dark:bg-blue-900 focus-within:border-[#0052ad] transition-colors">
                            <At className="text-zinc-400 dark:text-zinc-500 shrink-0" size={16} />
                            <Input
                                placeholder="sarah@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent py-2.5 text-[15px] font-[500] outline-none border-none text-[#00234a] dark:text-[#fff] shadow-none"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Password */}
                    <TextField isRequired name="password" className="flex flex-col gap-1.2">
                        <Label className="text-xs font-[700] uppercase tracking-wider text-[#00234a]/70 dark:text-white/70">
                            Password
                        </Label>
                        <InputGroup className="flex items-center gap-2 border border-[#c2c6d3]/60 dark:border-white/10 rounded-xl px-3 bg-[#f8f9ff] dark:bg-blue-900 focus-within:border-[#0052ad] transition-colors">
                            <ShieldKeyhole className="text-zinc-400 dark:text-zinc-500 shrink-0" size={16} />
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="At least 6 chars, 1 number, 1 special sym..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-2.5 text-[15px] font-[500] outline-none border-none text-[#00234a] dark:text-[#fff] shadow-none"
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

                    {/* Phone */}
                    <TextField isRequired name="phone" type="tel" className="flex flex-col gap-1.2">
                        <Label className="text-xs font-[700] uppercase tracking-wider text-[#00234a]/70 dark:text-white/70">
                            Phone Number
                        </Label>
                        <InputGroup className="flex items-center gap-2 border border-[#c2c6d3]/60 dark:border-white/10 rounded-xl px-3 bg-[#f8f9ff] dark:bg-blue-900 focus-within:border-[#0052ad] transition-colors">
                            {/* Replace Person with Phone icon if you import it from @gravity-ui/icons */}
                            <Handset className="text-zinc-400 dark:text-zinc-500 shrink-0" size={16} />
                            <Input
                                placeholder="+880 1XXXX-XXXXXX"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-transparent py-2.5 text-[15px] font-[500] outline-none border-none text-[#00234a] dark:text-[#fff] shadow-none"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Grid Block using HeroUI v3 Anatomy for Select layout elements */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Clinic Role Select */}
                        <div className="flex flex-col gap-1.2">
                            <Label className="text-xs font-[700] uppercase tracking-wider text-[#00234a]/70 dark:text-white/70">
                                Role
                            </Label>
                            <Select
                                aria-label="Role"
                                onSelectionChange={(key) => setClinicRole(String(key))}
                                className="w-full border border-[#c2c6d3]/60 dark:border-white/10 rounded-xl bg-zinc-50/50 dark:bg-[#001f42]"
                            >
                                <Select.Trigger className="w-full flex items-center justify-between px-3 py-2.5 text-[15px] text-[#00234a] dark:text-[#fff]">
                                    <Select.Value>{clinicRole}</Select.Value>
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="bg-white dark:bg-[#001f42] border border-[#c2c6d3]/30 dark:border-white/10 rounded-xl p-1">
                                        <ListBox.Item id="Medical Specialist" className="p-2 text-sm text-[#00234a] dark:text-[#fff] cursor-pointer hover:bg-zinc-100 dark:hover:bg-[#002b5c] rounded-lg">Medical Specialist</ListBox.Item>

                                        <ListBox.Item id="Patient Family" className="p-2 text-sm text-[#00234a] dark:text-[#fff] cursor-pointer hover:bg-zinc-100 dark:hover:bg-[#002b5c] rounded-lg">Patient Family</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Gender Select */}
                        <div className="flex flex-col gap-1.2">
                            <Label className="text-xs font-[700] uppercase tracking-wider text-[#00234a]/70 dark:text-white/70">
                                Gender
                            </Label>
                            <Select
                                aria-label="Gender"
                                onSelectionChange={(key) => setGender(String(key))}
                                className="w-full border border-[#c2c6d3]/60 dark:border-white/10 rounded-xl bg-zinc-50/50 dark:bg-[#001f42]"
                            >
                                <Select.Trigger className="w-full flex items-center justify-between px-3 py-2.5 text-[15px] text-[#00234a] dark:text-[#fff]">
                                    <Select.Value>{gender}</Select.Value>
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox className="bg-white dark:bg-[#001f42] border border-[#c2c6d3]/30 dark:border-white/10 rounded-xl p-1">
                                        <ListBox.Item id="Male" className="p-2 text-sm text-[#00234a] dark:text-[#fff] cursor-pointer hover:bg-zinc-100 dark:hover:bg-[#002b5c] rounded-lg">Male</ListBox.Item>
                                        <ListBox.Item id="Female" className="p-2 text-sm text-[#00234a] dark:text-[#fff] cursor-pointer hover:bg-zinc-100 dark:hover:bg-[#002b5c] rounded-lg">Female</ListBox.Item>
                                        <ListBox.Item id="Other" className="p-2 text-sm text-[#00234a] dark:text-[#fff] cursor-pointer hover:bg-zinc-100 dark:hover:bg-[#002b5c] rounded-lg">Other</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>
                    </div>

                    {/* Photo URL Field */}
                    <TextField name="avatarUrl" className="flex flex-col gap-1.2">
                        <Label className="text-xs font-[700] uppercase tracking-wider text-[#00234a]/70 dark:text-white/70">
                            Photo URL (Optional)
                        </Label>
                        <InputGroup className="flex items-center gap-2 border border-[#c2c6d3]/60 dark:border-white/10 rounded-xl px-3 bg-[#f8f9ff] dark:bg-blue-900 focus-within:border-[#0052ad] transition-colors">
                            <Picture className="text-zinc-400 dark:text-zinc-500 shrink-0" size={16} />
                            <Input
                                type="url"
                                placeholder="https://images/example.jpg"
                                value={avatarUrl}
                                onChange={(e) => setAvatarUrl(e.target.value)}
                                className="w-full bg-transparent py-2.5 text-[15px] font-[500] outline-none border-none text-[#00234a] dark:text-[#fff] shadow-none"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Safety Policy Hint Wrapper */}
                    <div className="p-4 rounded-xl text-xs font-[500] leading-[18px] bg-zinc-100/70 dark:bg-[#001f42]/60 text-zinc-500 dark:text-[#bfc7d3] border border-[#c2c6d3]/30 dark:border-white/5">
                        <span className="font-[700] uppercase text-[#00234a] dark:text-white text-[10px] tracking-wider mr-1">
                            Safety Policy:
                        </span>
                        Password must consist of at least 6 characters, including at least 1 number and 1 special symbol (e.g. !@#$%).
                    </div>

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

                    <Button
                        type="submit"
                        className="w-full h-14 rounded-xl font-[700] text-[16px] bg-[#003f83] dark:bg-[#b7ceff] text-white dark:text-[#00234a] hover:opacity-95 shadow-md transition-all active:scale-[0.99]"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Register Account
                    </Button>

                    <div className="text-center pt-4 border-t border-[#c2c6d3]/20 dark:border-white/5 text-[14px] font-[500] text-[#575f69] dark:text-[#bfc7d3]">
                        Already have an active profile?{" "}
                        <Link
                            href={`/auth/login?redirect=${encodeURIComponent(redirectTo)}`}
                            className="font-[700] text-[#0052ad] dark:text-[#abc7ff] hover:underline cursor-pointer ml-1"
                        >
                            Sign in here
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}