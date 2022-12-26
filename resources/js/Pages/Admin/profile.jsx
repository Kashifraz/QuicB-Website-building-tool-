import React from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import ProfileForm from "@/Components/ProfileForm";
import Alertbox from "@/Components/Alertbox";

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
                    <div className=" overflow-hidden  sm:rounded-lg">
                        <div className="p-6  ">
                        {flash.message && 
                            <Alertbox message = {flash.message}  />
                        }

                            <ProfileForm user={props.auth.user} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
