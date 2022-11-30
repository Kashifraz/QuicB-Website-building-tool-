import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import ProjectModel from "@/Components/ProjectModel";

export default function Dashboard(props) {
    const { flash } = usePage().props;
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Project Editing Canvas
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg">
                        <div className="p-6 ">
                            {flash.message && (
                                <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                <span class="font-medium">Danger alert!</span> {flash.message}
                              </div>
                            )}
                            Welcome to canvas!
                            {props.project.title}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
