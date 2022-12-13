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
                    <div className=" overflow-hidden sm:rounded-lg">
                        {flash.message && (
                            <div id="alert-1" class="flex p-4 mb-4 bg-green-200 rounded-lg dark:bg-green-200" role="alert">
                                <span class="sr-only">Info</span>
                                <div class="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
                                    {flash.message}
                                </div>
                                <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300" data-dismiss-target="#alert-1" aria-label="Close">
                                    <span class="sr-only">Close</span>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>

                        )}
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
