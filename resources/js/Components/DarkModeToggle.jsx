import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const enableDarkMode = () => {
        setDarkMode(true);
    };

    const enableLightMode = () => {
        setDarkMode(false);
    };

    return (
        <div className="flex z-50 space-x-1">
            <div
                className={`${
                    darkMode ? "bg-[#373636] text-green-500" : "text-gray-800"
                } rounded-md cursor-pointer ${
                    !darkMode ? "hover:text-gray-500" : ""
                } px-7 py-2 duration-200`}
                onClick={enableDarkMode}
            >
                <FaMoon size={15} />
            </div>
            <div
                className={`${
                    !darkMode
                        ? "bg-gray-200 text-green-500"
                        : "text-gray-800 dark:text-gray-50"
                } rounded-md cursor-pointer ${
                    darkMode
                        ? "hover:text-gray-500 dark:hover:text-gray-300"
                        : ""
                } px-7 py-2 duration-200`}
                onClick={enableLightMode}
            >
                <FaSun size={15} />
            </div>
        </div>
    );
};

export default DarkModeToggle;
