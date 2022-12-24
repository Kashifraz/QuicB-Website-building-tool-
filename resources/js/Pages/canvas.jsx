import React, { useState } from "react";
import CanvasLayout from "@/Layouts/CanvasLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSquarePlus, faCopy, faCircleXmark, faDownload, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Inertia } from "@inertiajs/inertia";
import Alertbox from "@/Components/Alertbox";
import ShowProjectCom from "@/Components/ShowProjectCom";
import Customization from "@/Components/Customization";
import route from "../../../vendor/tightenco/ziggy/src/js";


export default function Canvas(props) {
    const { flash } = usePage().props;
    const [link, setLink] = useState(props.link);
    const [showSection, setshowSection] = useState(false);
    const [showlink, setshowlink] = useState(false);
    const [Copy, setCopy] = useState(false);

    function toggleSection() {
        if (showSection == false) {
            setshowSection(true);
            setshowlink(false);
        }
        else
            setshowSection(false);
    }

    function toggleLinkSection() {
        if (showlink == false) {
            setshowlink(true);
            setshowSection(false);
        }
        else {
            setshowlink(false);
            setCopy(false);
        }
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
                <div className="max-w-7xl sm:px-6 lg:px-8 ml-10">
                    <div className="overflow-hidden sm:rounded-lg">
                        <div className="p-3 mx-auto">
                            {flash.message &&
                                <Alertbox message={flash.message} />
                            }
                        </div>
                        {showSection ? (
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
                        <a
                            href={route("project.preview", props.project.id)} target="_blank"
                            className="bg-blue-700 text-white active:bg-blue-800 font-bold text px-3 ml-2  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                            <FontAwesomeIcon icon={faEye} /> Preview
                        </a>
                        <Link href={route("project.download", props.project.id)}
                            className="bg-blue-700 text-white active:bg-blue-800 font-bold text px-3 ml-2  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                            <FontAwesomeIcon icon={faDownload} /> Download Code
                        </Link>
                        {showlink ? (<>
                            <button
                                tabIndex="-1" onClick={toggleLinkSection}
                                type="button" className="bg-red-700 text-white active:bg-red-800 font-bold text px-3 ml-2  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                                <FontAwesomeIcon icon={faCircleXmark} /> Close
                            </button>
                        </>) : (<>
                            <button
                                tabIndex="-1" onClick={toggleLinkSection}
                                type="button" className="bg-blue-700 text-white active:bg-blue-800 font-bold text px-3 ml-2  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                                <FontAwesomeIcon icon={faShareFromSquare} /> Share Project
                            </button>
                        </>)}

                    </div>
                </div>
            </div>
            {showlink &&
                <div class="flex mx-20 mb-5 bg-gradient-to-r from-indigo-100 to-purple-300 overflow-y-auto max-h-80 rounded-lg px-5 pb-5  ">
                    <div class="relative w-full mt-4">
                        <div class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-indigo-50 rounded-lg   border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"> {link} </div>
                        <button type="submit" onClick={() => {
                            navigator.clipboard.writeText(link);
                            setCopy(true);
                        }}
                            class="absolute top-0 right-0 p-2.5 text-sm font-medium text-gray bg-gradient-to-r from-indigo-300 to-purple-500 rounded-r-lg border border-gray-300 hover:bg-gray-300  focus:outline-none  dark:bg-gray-600 dark:hover:bg-gray-700 ">
                            {Copy ? (
                                <>copied!</>
                            ) : (<><FontAwesomeIcon icon={faCopy} /> Copy</>)}
                        </button>
                    </div>
                </div>
            }

            <ShowProjectCom
                showSection={showSection}
                components={props.components}
                project={props.project}
            />

            <Customization
                projectComponents={props.projectComponents}
                elements={props.elements}
            />

        </CanvasLayout>
    );
}
