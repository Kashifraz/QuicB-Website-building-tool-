import React, { useState } from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChartSimple, faSackDollar } from "@fortawesome/free-solid-svg-icons";
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
                    <div className=" overflow-hidden">
                        <div className="  border-b border-gray-200">
                            <div class="text-gray-600 body-font">
                                <div class="container bg-white rounded-lg shadow px-5 py-8 mx-auto">
                                    <div class="flex flex-wrap w-full mb-8">
                                        <div class="w-full mb-6 lg:mb-0">
                                            <h1 class="sm:text-3xl text-5xl font-medium title-font mb-2 text-gray-900"><FontAwesomeIcon icon={faChartSimple} /> Statistic</h1>
                                            <div class="h-1 w-36 bg-indigo-500 rounded"></div>
                                        </div>
                                    </div>
                                    <div class="flex flex-wrap -m-4 text-center">
                                        <div class="p-4 sm:w-1/3 w-1/2">
                                            <div class="p-4 bg-gradient-to-r from-cyan-800 to-blue-600 rounded-lg p-2 xl:p-6">
                                                <h2 class="title-font font-medium sm:text-4xl text-3xl text-white"> $ {props.profitValues.profit}</h2>
                                                <p class="leading-relaxed text-gray-100 font-bold">Net Profit/Loss</p>
                                            </div>
                                        </div>
                                        <div class="p-4 sm:w-1/3 w-1/2">
                                            <div class="p-4 bg-gradient-to-r from-cyan-800 to-blue-600 rounded-lg p-2 xl:p-6">
                                                <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">$ {props.profitValues.revenue}</h2>
                                                <p class="leading-relaxed text-gray-100 font-bold">Estimated Revenue</p>
                                            </div>
                                        </div>
                                        <div class=" p-4 sm:w-1/3 w-1/2">
                                            <div class="p-4 bg-gradient-to-r from-cyan-800 to-blue-600 rounded-lg p-2 xl:p-6">
                                                <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">$ {props.profitValues.expenses}</h2>
                                                <p class="leading-relaxed text-gray-100 font-bold">All expenses</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="text-gray-600 body-font mt-5">
                                <div class="container bg-white rounded-lg shadow px-5 py-8 mx-auto">
                                    <div class="flex flex-wrap w-full mb-8">
                                        <div class="w-full mb-6 lg:mb-0">
                                            <h1 class="sm:text-3xl text-5xl font-medium title-font mb-2 text-gray-900"><FontAwesomeIcon icon={faUsers} /> User's Analytics</h1>
                                            <div class="h-1 w-36 bg-indigo-500 rounded"></div>
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
                                                data={props.PieChart.data}
                                            />
                                        </div>


                                    </div>
                                </div>
                            </div>

                            
                            <div class="text-gray-600 body-font mt-5">
                                <div class="container bg-white rounded-lg shadow px-5 py-8 mx-auto">
                                    <div class="flex flex-wrap w-full mb-8">
                                        <div class="w-full mb-6 lg:mb-0">
                                            <h1 class="sm:text-3xl text-5xl font-medium title-font mb-2 text-gray-900"><FontAwesomeIcon icon = {faSackDollar} /> Charts </h1>
                                            <div class="h-1 w-36 bg-indigo-500 rounded"></div>    
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2 flex space-x-28">
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
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
