import React, { useState, useRef } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import Elementgroup from "@/Components/Elementgroup";
import route from "../../../vendor/tightenco/ziggy/src/js";

export default function ProjectComponent(props) {
    const [show, setShow] = useState(false);
    const [Component_id, setId] = useState();
    return (
        <div key={props.projectComponent.id} className="mx-20 bg-white border-b border-gray-200 rounded">
            <div className=" w-full sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center ">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{props.projectComponent.name} Component </h5>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <div class="inline-flex " >
                            <Link 
                                href={route('projectcomponent.delete',props.projectComponent.id)}
                                className="bg-red-800 active:bg-red-800 font-bold text-white  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-3 mb-3 ease-linear transition-all duration-150 py-2 px-3">
                                <FontAwesomeIcon icon={faTrash} /> 
                            </Link>

                            {show && Component_id == props.projectComponent.id ? (<>
                                <button onClick={() => {
                                    setShow(false);
                                    setId(null);
                                }}
                                    type="button" className="bg-gray-200 text-gray active:bg-gray-800 font-bold text   rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2 px-3">
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </>) : (<>
                                <button onClick={() => {
                                    setShow(true);
                                    setId(props.projectComponent.id);
                                }}
                                    type="button" className="bg-gray-200 text-gray active:bg-gray-800 font-bold text   rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2 px-3">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </>)}




                        </div>
                    </div>
                </div>
                {show &&
                    <div className="flow-root" >
                        <Elementgroup projectComponent={props.projectComponent} />
                    </div>
                }

            </div>

        </div>
    );
}
