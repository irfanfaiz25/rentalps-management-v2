import React, { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import { SlClose } from "react-icons/sl";
import Pagination from "@/Components/Pagination";

const Menu = ({ consoles, currentPage, perPage }) => {
    const [openModal, setOpenModal] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [confirmationDeleteData, setConfirmationDeleteData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    let rupiah = new Intl.NumberFormat("ID", {
        style: "currency",
        currency: "IDR",
    });

    const startingSerialNumber = (currentPage - 1) * perPage + 1;

    const { data, setData, reset, clearErrors, processing } = useForm({
        name: "",
        model: "",
        price: "",
    });

    const { flash, errors } = usePage().props;

    const handleSubmitConsole = (e) => {
        e.preventDefault();
        if (isEditing) {
            router.post(
                `/console/${editId}`,
                {
                    _method: "patch",
                    name: data.name,
                    model: data.model,
                    price: data.price,
                },
                {
                    onSuccess: () => {
                        reset();
                        setOpenModal(false);
                        setIsEditing(false);
                        setEditId(null);
                    },
                }
            );
        } else {
            router.post("/console", data, {
                onSuccess: () => {
                    reset();
                    setOpenModal(false);
                },
            });
        }
    };

    const handleDeleteConsole = () => {
        router.post(
            `console/${confirmationDeleteData.id}/delete`,
            {
                _method: "delete",
            },
            {
                onSuccess: () => {
                    setConfirmationDeleteData(null);
                    setConfirmationModal(false);
                },
            }
        );
    };

    const openAddModal = () => {
        setOpenModal(true);
        clearErrors();
        reset();
        setIsEditing(false);
        setEditId(null);
    };

    const closeAddModal = () => {
        setOpenModal(false);
        clearErrors();
        setIsEditing(false);
        setEditId(null);
    };

    const openEditModal = (console) => {
        setData({
            name: console.name,
            model: console.model,
            price: parseInt(console.price),
        });
        setIsEditing(true);
        setEditId(console.id);
        setOpenModal(true);
    };

    const openConfirmationModal = (console) => {
        setConfirmationModal(true);
        setConfirmationDeleteData(console);
    };

    const closeConfirmationModal = () => {
        setConfirmationModal(false);
        setConfirmationDeleteData(null);
    };

    useEffect(() => {
        flash.message && toast.success(flash.message);
    }, [flash]);

    return (
        <AdminLayout>
            <div className="flex justify-end items-center mb-3">
                <button
                    className="px-6 py-2 bg-green-500 text-gray-50 rounded-md text-sm"
                    onClick={openAddModal}
                >
                    New Console
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs font-bold text-gray-700 uppercase bg-gray-100 dark:bg-[#252525] dark:text-gray-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Model
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {consoles.data.map((console, i) => {
                            return (
                                <tr
                                    key={i}
                                    className="odd:bg-white odd:dark:bg-[#343434] even:bg-gray-50 even:dark:bg-[#383838] border-b dark:border-[#414040]"
                                >
                                    <td className="px-6 py-3">
                                        {startingSerialNumber + i}
                                    </td>
                                    <th
                                        scope="row"
                                        className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {console.name}
                                    </th>
                                    <td className="px-6 py-3">
                                        {console.model}
                                    </td>
                                    <td className="px-6 py-3">
                                        {rupiah.format(console.price)}
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className="flex items-center text-sm font-medium text-gray-800 dark:text-gray-50 me-3">
                                            <span
                                                className={`flex w-2 h-2 ${
                                                    console.is_active
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                } rounded-full me-1.5 flex-shrink-0`}
                                            ></span>
                                            {console.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex justify-start items-center space-x-1">
                                            <button
                                                className="text-green-500 hover:text-white border border-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-semibold rounded-lg text-xs px-4 py-0.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                                onClick={() =>
                                                    openEditModal(console)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-white border border-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-xs px-4 py-0.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
                                                onClick={() =>
                                                    openConfirmationModal(
                                                        console
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex justify-end items-center">
                <Pagination props={consoles} />
            </div>

            {/* form modal */}
            <Modal show={openModal} onClose={closeAddModal}>
                <div className="flex justify-end pr-6 mt-4">
                    <SlClose
                        className="cursor-pointer hover:text-gray-600"
                        onClick={closeAddModal}
                        size={20}
                    />
                </div>
                <form className="p-6" onSubmit={handleSubmitConsole}>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => {
                                setData("name", e.target.value);
                            }}
                            value={data.name}
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2 dark:bg-[#343434] dark:border-gray-500 dark:text-gray-50 dark:focus:ring-green-500 dark:focus:border-green-500 ${
                                errors.name ? "border-red-500" : ""
                            }`}
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="model"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Model
                        </label>
                        <select
                            id="model"
                            onChange={(e) => {
                                setData("model", e.target.value);
                            }}
                            value={data.model}
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2 dark:bg-[#343434] dark:border-gray-700 dark:text-gray-50 dark:focus:ring-green-500 dark:focus:border-green-500 ${
                                errors.model ? "border-red-500" : ""
                            }`}
                        >
                            <option value="">
                                --select playstation model--
                            </option>
                            <option value="PS 3">PS 3</option>
                            <option value="PS 4">PS 4</option>
                        </select>
                        {errors.model && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.model}
                            </div>
                        )}
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Price
                        </label>
                        <input
                            type="text"
                            id="price"
                            onChange={(e) => {
                                setData("price", e.target.value);
                            }}
                            value={data.price}
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2 dark:bg-[#343434] dark:border-gray-700 dark:text-gray-50 dark:focus:ring-green-500 dark:focus:border-green-500 ${
                                errors.price ? "border-red-500" : ""
                            }`}
                        />
                        {errors.price && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.price}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end space-x-1 pt-5">
                        <div
                            className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg cursor-pointer text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            onClick={closeAddModal}
                        >
                            Cancel
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            {isEditing ? "Update" : "Submit"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* confirmation delete modal */}
            <Modal show={confirmationModal} onClose={closeConfirmationModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                        Are you sure you want to delete "
                        {confirmationDeleteData?.name}" ?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-50">
                        Once the data is deleted, all of its resources and data
                        will be permanently deleted.
                    </p>
                    <div className="mt-6 flex justify-end space-x-1">
                        <button
                            className="px-5 py-2 bg-gray-100 rounded-md text-gray-800 font-bold text-sm hover:bg-gray-200"
                            onClick={closeConfirmationModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-5 py-2 bg-red-500 rounded-md text-gray-50 font-bold text-sm hover:bg-red-700"
                            onClick={handleDeleteConsole}
                        >
                            Delete Data
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
};

export default Menu;
