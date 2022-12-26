import React from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import DataTable from "@/Components/DataTable";
import Alertbox from "@/Components/Alertbox";

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
                    <div className=" overflow-hidden sm:rounded-lg">
                        {flash.message && 
                            <Alertbox message = {flash.message}  />
                        }
                        <div className="p-6 bg-white border-b border-gray-200">
                            <DataTable customers={props.customers} IsSubscriber={false}
                                Search={props.search} Filter={props.filter} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
