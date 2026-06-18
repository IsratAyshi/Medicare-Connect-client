"use client";

import { memo, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "@gravity-ui/icons";

export const ThemeSwitch = memo(function ThemeSwitch() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className="w-[40px] h-[40px] rounded-full border border-[#c2c6d3]/30 bg-transparent" />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle Theme"
            className="
                w-[40px] h-[40px] rounded-lg
                flex items-center justify-center
                bg-transparent hover:bg-[#003f83]/10 dark:hover:bg-[#d7e2ff]/10
                text-[#003f83] dark:text-[#d7e2ff]
                transition-all duration-200
            "
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
});