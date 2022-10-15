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
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="adminDashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 ">
                            {flash.message && (
                                <div
                                className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                                    role="alert"
                                >
                                    <span className="font-medium">Success!</span>{" "}
                                    {flash.message}
                                </div>
                            )}
                            <ExpenseModal/>
                            <ExpenseTable expenses={props.expenses} expensesum= {props.ExpenseSum}/>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
