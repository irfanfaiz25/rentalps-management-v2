import React, { useEffect, useState } from "react";
import { IoHomeOutline, IoFastFoodOutline } from "react-icons/io5";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import { HiMenuAlt3 } from "react-icons/hi";
import { GiConsoleController } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { Link } from "@inertiajs/react";
import Header from "@/Components/Header";

const AdminLayout = ({ children }) => {
    const [open, setOpen] = useState(true);
    const [activePath, setActivePath] = useState(window.location.pathname);
    const activePathName = activePath.substring(1);
    const menus = [
        {
            name: "dashboard",
            link: "/dashboard",
            icon: IoHomeOutline,
        },
        {
            name: "transaction",
            link: "/transaction",
            icon: FaArrowsTurnToDots,
        },
        {
            name: "consoles",
            link: "/consoles",
            icon: GiConsoleController,
        },
        {
            name: "menu",
            link: "/menu",
            icon: IoFastFoodOutline,
        },
        {
            name: "report",
            link: "/report",
            icon: TbReport,
        },
    ];
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        if (mediaQuery.matches) {
            setOpen(false);
        }

        const handleResize = (e) => {
            if (e.matches) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        };

        mediaQuery.addEventListener("change", handleResize);
        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    const isActive = (menuLink) => {
        if (menuLink === "/") {
            return activePath === "/";
        }
        return activePath.startsWith(menuLink);
    };

    return (
        <div className="relative">
            <Header />
            <div className="flex gap-6 pt-16">
                <div
                    className={`bg-[#FAFAFA] dark:bg-[#1c1c1c] fixed top-0 left-0 min-h-screen ${
                        open ? "w-72" : "w-16"
                    } duration-500 text-gray-100 px-3 z-10 pt-20`}
                >
                    <div className="py-3 flex justify-end mr-3">
                        <HiMenuAlt3
                            size={26}
                            className="cursor-pointer text-gray-800 dark:text-gray-50"
                            onClick={() => setOpen(!open)}
                        />
                    </div>
                    <div className="mt-10 flex flex-col gap-4 relative text-gray-800 dark:text-gray-50">
                        {menus?.map((menu, i) => (
                            <Link
                                to={menu?.link}
                                key={i}
                                className={` ${
                                    isActive(menu?.link)
                                        ? "bg-green-400 text-gray-800"
                                        : ""
                                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-green-400 dark:hover:text-gray-800 rounded-md`}
                                onClick={() => setActivePath(menu?.link)}
                            >
                                <div>
                                    {React.createElement(menu?.icon, {
                                        size: "20",
                                    })}
                                </div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-300 ${
                                        !open &&
                                        "opacity-0 translate-x-28 overflow-hidden"
                                    } capitalize`}
                                >
                                    {menu?.name}
                                </h2>
                                <h2
                                    className={`${
                                        open && "hidden"
                                    } absolute left-48 bg-white dark:bg-gray-800 font-semibold whitespace-pre text-gray-900 dark:text-green-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                                >
                                    {menu?.name}
                                </h2>
                            </Link>
                        ))}
                    </div>
                </div>
                <div
                    className={`flex-1 p-3 text-xl bg-[#FAFAFA] dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-50 font-semibold overflow-auto ${
                        open && window.innerWidth < 1024
                            ? "bg-black/70 dark:bg-gray-500/70"
                            : ""
                    } ${
                        open ? "ml-16 lg:ml-72" : "ml-16"
                    } duration-500 sm:pl-7 pt-5`}
                    onClick={
                        open && window.innerWidth < 1024
                            ? () => setOpen(!open)
                            : () => {}
                    }
                >
                    <div className="flex justify-start">
                        <div className="w-full bg-white drop-shadow-md py-6 px-4 rounded-md">
                            <h1 className="text-4xl font-extra-bold text-gray-800 capitalize">
                                {activePathName}
                            </h1>
                            <h1 className="text-base font-medium text-gray-800 ">
                                Rental PS Management
                            </h1>
                        </div>
                    </div>
                    <div className="mt-6">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
