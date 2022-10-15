import React from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import ProfileForm from "@/Components/ProfileForm";

export default function profile(props) {
    const { flash } = usePage().props;
    return (
        <AdminAuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Update Profile
                </h2>
            }
        >
            <Head title="adminDashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200 ">
                            {flash.message && (
                                <div
                                    className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                                    role="alert"
                                >
                                    <span className="font-medium">
                                        Success!
                                    </span>{" "}
                                    {flash.message}
                                </div>
                            )}

                            <ProfileForm user={props.auth.user} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
