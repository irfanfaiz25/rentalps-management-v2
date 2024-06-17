import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="fixed w-full z-50 bg-white dark:bg-[#252525] text-gray-800 dark:text-gray-50 flex justify-between items-center px-4 py-4 shadow-md">
            <div className="flex items-center">
                <img src="/img/Logo.png" alt="logo" className="w-7 h-8 ml-2" />
                <h1 className="text-gray-800 dark:text-gray-50 font-semibold text-xl ml-2 font-sans">
                    GGWP Gaming
                </h1>
            </div>
            <div className="relative">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="focus:outline-none"
                >
                    <FaUserCircle size={26} />
                </button>
                {showMenu && (
                    <div
                        className={`absolute right-0 mt-2 w-52 bg-white dark:bg-[#252525] text-gray-800 dark:text-gray-50 border dark:border-[#3c3c3c] rounded shadow-lg z-50`}
                    >
                        <div className="py-2">
                            <div className="px-4 pt-1 pb-2">
                                <div className="flex items-center space-x-2 pl-1 py-1">
                                    <FaUserCircle size={20} />
                                    <span className="font-semibold">Aji</span>
                                </div>
                            </div>
                            <div className="border-t border-gray-200/80 dark:border-[#3c3c3c] flex justify-center">
                                <div className="mx-4 my-2">
                                    <DarkModeToggle />
                                </div>
                            </div>
                            <div className="border-t border-gray-200/80 dark:border-[#3c3c3c]">
                                <div className="mx-1 pt-2">
                                    <div className="hover:bg-gray-200 dark:hover:bg-[#373636] px-4 py-2 rounded-md flex items-center space-x-2 text-sm cursor-pointer">
                                        <BiLogOutCircle size={20} />
                                        <span>Sign out</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
