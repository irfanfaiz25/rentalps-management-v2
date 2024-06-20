import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ props }) => {
    const links = props.links;
    const currentPage = props.current_page;
    const lastPage = props.last_page;

    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base h-10">
                {links.map((link, i) => {
                    return (
                        <li key={i}>
                            <Link
                                href={link.url}
                                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-800 dark:text-gray-50 ${
                                    link.active
                                        ? "bg-gray-200 border-gray-300 dark:bg-[#2f2f2f] dark:border-[#414141]"
                                        : "bg-slate-100 border-gray-300 dark:bg-[#252525] dark:border-[#353535]"
                                } border hover:bg-slate-700 hover:text-gray-200 ${
                                    i == 0 && "rounded-s-md"
                                } ${i == links.length - 1 && "rounded-e-md"} ${
                                    i == 0 && currentPage == 1 && "hidden"
                                } ${
                                    currentPage == lastPage &&
                                    i == links.length - 1 &&
                                    "hidden"
                                }`}
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Pagination;
