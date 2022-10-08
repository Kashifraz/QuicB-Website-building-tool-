import React from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import DataTable from "@/Components/DataTable";

export default function Dashboard(props) {
    const { flash } = usePage().props;
    return (
        <AdminAuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div class="grid grid-cols-2 gap-4 mt-5 mb-5 text-center">
                                <div>
                                    <b>
                                        <h4>Total Revenue</h4>
                                    </b>
                                </div>
                                <div>
                                    <h4>$ {props.totalRevenue}/-</h4>
                                </div>
                            </div>
                            <DataTable
                                customers={props.customers}
                                IsSubscriber={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
