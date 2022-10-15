import React, { useState } from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import BarChart from "@/Components/BarChart";
import PieChart from "@/Components/PieChart";
import LineChart from "@/Components/LineChart";

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
                            <div className="grid grid-cols-3 gap-1  text-center my-20">
                                <div>
                                    <b>Net Profit/Loss</b>
                                    <h4>$ {props.profitValues.profit}</h4>
                                </div>
                                <div>
                                    <b>Estimated Revenue</b>
                                    <h4>$ {props.profitValues.revenue}</h4>
                                </div>
                                <div>
                                    <b>All expenses</b>
                                    <h4>$ {props.profitValues.expenses}</h4>
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-2 flex space-x-28">
                                <div className="col-span-3">
                                    <BarChart
                                        month={props.BarChart.month}
                                        user={props.BarChart.user}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <PieChart
                                        label={props.PieChart.label}
                                        data ={props.PieChart.data}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-2 flex mx-20 my-20">
                                <div className="col-span-5">
                                    <LineChart
                                        month={props.BarChart.month}
                                        user={props.BarChart.user}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
