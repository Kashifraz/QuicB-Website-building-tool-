import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import Pagination from "./Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { filter } from "lodash";

export default function DataTable({ customers, IsSubscriber, Search, Filter }) {
    const { flash } = usePage().props;

    function destroy(e) {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(route("customers.destroy", e.currentTarget.id));
        }
    }

    const { data, setData, post, processing, errors } = useForm({
        search: Search,
        filter: Filter,
    });

    const [isChecked, setIsChecked] = useState([]);

    const allDelete = async () => {

        if (confirm("Are you sure you want to delete all selected users?")) {
            Inertia.delete(route("customers.alldelete", { ids: JSON.stringify(isChecked) }));
        }
    }

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        // console.log(checked);
        if (checked) {
            setIsChecked([...isChecked, value]);
        } else {
            setIsChecked(isChecked.filter((e) => e !== value));
        }
    }

    function search(e) {
        e.preventDefault();
        Inertia.get(
            route("customers.index", {
                search: data.search,
                filter: data.filter,
            })
        );
    }

    return (
        <div className="overflow-x-auto relative  sm:rounded-lg">
           
            {!IsSubscriber && (
                <div class="grid grid-cols-5 gap-4">
                    <div className="col-span-1"></div>
                    <div className="col-span-1">
                        <select
                            value={data.filter}
                            onChange={(e) => setData("filter", e.target.value)}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="0">All Time</option>
                            <option value="1">yesterday</option>
                            <option value="7">Last 7 days</option>
                            <option value="30">last 30 days</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <form className="flex items-center mb-5">
                            <label for="simple-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative w-full">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={data.search}
                                    onChange={(e) =>
                                        setData("search", e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={search}
                                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </div>

                    <div className="col-span-1"></div>
                </div>
            )}

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <button
                                onClick={allDelete}
                                type="button"
                                className=" py-2 text-lg  rounded"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Id
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Email
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Subscription Status
                        </th>
                        {IsSubscriber && (
                            <>
                                <th scope="col" className="py-3 px-6">
                                    Subscription Status
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Subscription Plan
                                </th>
                            </>
                        )}

                        {!IsSubscriber && (
                            <>
                                <th scope="col" className="py-3 px-6">
                                    Action
                                </th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {customers.data.map((customer) => (
                        <tr
                            key={customer.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="p-4 w-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        value={customer.id}
                                        checked={customer.isChecked}
                                        onChange={(e) => handleCheckbox(e)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="checkbox-table-search-1"
                                        className="sr-only"
                                    >
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {customer.id}
                            </th>
                            <td className="py-4 px-6">{customer.name}</td>
                            <td className="py-4 px-6">{customer.email}</td>
                            <td className="py-4 px-6">
                                {customer.stripe_id != null ? (<>Subscriber</>) : (<>Not Subscribed</>)}
                            </td>

                            {IsSubscriber && (
                                <>
                                    <td className="py-4 px-6">
                                        <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                                            {customer.stripe_status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        {customer.subscription_name}
                                    </td>
                                </>
                            )}
                            {!IsSubscriber && (
                                <>
                                    <td className="py-4 px-6">
                                        <button
                                            onClick={destroy}
                                            id={customer.id}
                                            tabIndex="-1"
                                            type="button"
                                            className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="ml-9">
                <Pagination links={customers.links} id={customers.id} />
            </div>
        </div>
    );
}
