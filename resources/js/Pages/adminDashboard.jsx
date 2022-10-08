import React from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";

export default function Dashboard(props) {
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
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="grid grid-cols-3 gap-1 mt-5 mb-5 text-center">
                                <div>
                                    <b>Net Profit/Loss</b>
                                    <h4>$ {props.profit}</h4>
                                </div>
                                <div>
                                    <b>Estimated Revenue</b>
                                    <h4>$ {props.revenue}</h4>
                                </div>
                                <div>
                                    <b>All expenses</b>
                                    <h4>$ {props.expenses}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
