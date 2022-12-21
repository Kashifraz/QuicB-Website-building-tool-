import React from "react";
import CanvasLayout from "@/Layouts/CanvasLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSquarePlus, faSave, faTrash, faCircleXmark, faDownload, faShareFromSquare, faSignalPerfect, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Inertia } from "@inertiajs/inertia";
import Alertbox from "@/Components/Alertbox";
import ShowProjectCom from "@/Components/ShowProjectCom";
import Customization from "@/Components/Customization";


export default function Canvas(props) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        showSection: false,
    });

    function toggleSection() {
        if (data.showSection == false)
            setData('showSection', true)
        else
            setData('showSection', false)
    }


    return (
        <CanvasLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Project Editing Canvas
                </h2>
            }
        >
            <Head title="Canvas" />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg">
                        <div className="p-3 ">
                        {flash.message && 
                            <Alertbox message = {flash.message}  />
                        }
                        </div>
                        {data.showSection ? (
                            <>
                                <button
                                    onClick={toggleSection}
                                    type="button" className="bg-red-700 text-white active:bg-red-800 font-bold text px-3 ml-2  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                                    <FontAwesomeIcon icon={faCircleXmark} /> Close
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={toggleSection}
                                    type="button" className="bg-blue-700 text-white active:bg-blue-800 font-bold text px-3 ml-2  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                                    <FontAwesomeIcon icon={faSquarePlus} /> Import Component
                                </button>
                            </>
                        )}
                        <button
                            // onClick={destroyComponent}

                            tabIndex="-1"
                            type="button" className="bg-blue-700 text-white active:bg-blue-800 font-bold text px-3 ml-2  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                            <FontAwesomeIcon icon={faEye} /> Preview
                        </button>
                        <button
                            // onClick={destroyComponent}

                            tabIndex="-1"
                            type="button" className="bg-blue-700 text-white active:bg-blue-800 font-bold text px-3 ml-2  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                            <FontAwesomeIcon icon={faDownload} /> Download Code
                        </button>
                        <button
                            // onClick={destroyComponent}

                            tabIndex="-1"
                            type="button" className="bg-blue-700 text-white active:bg-blue-800 font-bold text px-3 ml-2  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                            <FontAwesomeIcon icon={faShareFromSquare} /> Share Project
                        </button>
                    </div>
                </div>
            </div>
            <ShowProjectCom
                showSection={data.showSection}
                components={props.components}
                project={props.project}
            />

            <Customization 
            projectComponents = {props.projectComponents} 
            elements = {props.elements}
            />

            
        </CanvasLayout>
    );
}
