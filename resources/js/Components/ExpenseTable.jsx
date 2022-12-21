import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "./Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ExpenseTable({ expenses, expensesum }) {
    function destroy(e) {
        if (confirm("Are you sure you want to delete?")) {
            Inertia.delete(route("expense.destroy", e.currentTarget.id));
        }
    }

    const [isChecked, setIsChecked] = useState([]);

    const allDelete = async () => {

        if (confirm("Are you sure you want to delete all selected users?")) {
            Inertia.delete(route("expense.alldelete", { ids: JSON.stringify(isChecked) }));
        }
    }

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        console.log(checked);
        if (checked) {
            setIsChecked([...isChecked, value]);
        } else {
            setIsChecked(isChecked.filter((e) => e !== value));
        }
    }

    return (
        <div className="overflow-x-auto relative ">
            <div className="grid grid-cols-2 gap-4 mt-5 mb-5 text-center">
                <div>
                    <b>
                        <h4>Total Expense</h4>
                    </b>
                </div>
                <div>
                    <h4>$ {expensesum}/-</h4>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
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
                            Title
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Type
                        </th>

                        <th scope="col" className="py-3 px-6">
                            Amount
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Description
                        </th>

                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.data.map((expense) => (
                        <tr
                            key={expense.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="p-4 w-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        value={expense.id}
                                        checked={expense.isChecked}
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
                                {expense.id}
                            </th>
                            <td className="py-4 px-6">{expense.title}</td>
                            <td className="py-4 px-6">{expense.expensetype}</td>

                            <td className="py-4 px-6">$ {expense.amount}/-</td>
                            <td className="py-4 px-6">{expense.description}</td>

                            <td className="py-4 px-6">
                                <button
                                    onClick={destroy}
                                    id={expense.id}
                                    tabIndex="-1"
                                    type="button"
                                    className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="ml-9">
                <Pagination links={expenses.links} id={expenses.id} />
            </div>
            
            
        </div>
    );
}
