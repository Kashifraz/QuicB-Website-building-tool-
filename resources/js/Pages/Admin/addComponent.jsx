import React from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import ExpenseModal from "@/Components/ExpenseModal";
import ExpenseTable from "@/Components/ExpenseTable";

export default function expense(props) {
    const { flash } = usePage().props;
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     title: "",
    //     expensetype: "salary",
    //     amount: 0,
    //     description: "",
    // });

    // const onHandleChange = (event) => {
    //     setData(
    //         event.target.name,
    //         event.target.type === "checkbox"
    //             ? event.target.checked
    //             : event.target.value
    //     );
    // };

    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route("expense.store"));
    // };

    return (
        <AdminAuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Component
                </h2>
            }
        >
            <Head title="Add Component" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 ">
                            <div class="mb-6">
                                <label
                                    for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Enter Component Name
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="Component Name"
                                    required=""
                                />
                            </div>
                            <div className="container text-center ">
                                <h1 className="">Component Name</h1>
                                <hr />
                                <div className="elemment">
                                    <h2 >Element tag name</h2>
                                    <hr />
                                    <div className="grid grid-cols-2 gap-2 text-center">
                                        <div>
                                            <h3>Element Attributes</h3>
                                        </div>

                                        <div>
                                            <h3>Element Properties</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* <button
                                type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Add Element
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
