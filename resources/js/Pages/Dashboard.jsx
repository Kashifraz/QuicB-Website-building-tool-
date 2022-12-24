import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import ProjectModel from "@/Components/ProjectModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSquareUpRight, faClock } from "@fortawesome/free-solid-svg-icons";
import Alertbox from "@/Components/Alertbox";

export default function Dashboard(props) {
    const { flash } = usePage().props;


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg">
                        <div className="p-6 ">

                            <ProjectModel user_id={props.user_id} />

                            <div class=" w-full sm:p-8 mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                                <div className="p-3 mx-auto text-center item-center">
                                    {flash.message &&
                                        <Alertbox message={flash.message} />
                                    }
                                </div>
                                <div class="flex justify-between items-center mb-4">
                                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Saved Projects</h5>
                                </div>
                                <div class="flow-root ">
                                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                        {props.projects.length == 0 ? (<> <div>No projects added yet</div> </>) : (
                                            <>
                                                {props.projects.map((project) => (
                                                    <>
                                                        <li class="py-3 sm:py-4 ">
                                                            <div class="flex items-center space-x-4">
                                                                <div class="flex-shrink-0">
                                                                    <img class="w-16 h-16 rounded-full" src="https://umbraco.com/media/r5nfrprt/code_too.png?quality=80" alt="Neil image" />
                                                                </div>
                                                                <div class="flex-1 min-w-0">
                                                                    <p class="text-2xl font-bold text-gray-900 truncate dark:text-white">
                                                                        {project.title}
                                                                    </p>
                                                                    <p class="text-lg text-gray-500  dark:text-gray-400">
                                                                        {project.description}
                                                                    </p>
                                                                    <p className="text-gray-500  dark:text-gray-400">
                                                                        <FontAwesomeIcon icon={faClock} />  <small className="text-muted">{formatDate(project.created_at)}</small>
                                                                    </p>

                                                                </div>
                                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                                    <div class="inline-flex  " >
                                                                        <Link href={route("project.delete", project)}
                                                                            class="bg-red-700 text-white active:bg-red-800 font-bold text px-3  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                                                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                                                        </Link>

                                                                        <Link
                                                                            href={route("project.canvas", project)}
                                                                            class="bg-blue-700 text-white active:bg-blue-800 font-bold text px-3 ml-2  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                                                                            <FontAwesomeIcon icon={faSquareUpRight} /> Open
                                                                        </Link>
                                                                        {/* <ElementModal component={component} elements={component.elements} /> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </>
                                                ))}

                                            </>
                                        )}


                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
