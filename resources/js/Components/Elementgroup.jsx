import React, { useState, useRef } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Element from "@/Components/Element";

export default function Elementgroup(props) {
   
    return (
        <div >
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {props.projectComponent.projectelementgroups.length == 0 ? (<> <div>No Element Groups exist</div> </>) : (
                    <>
                        {props.projectComponent.projectelementgroups.map((Elementgroup) => (
                            <>
                                <li className="py-3 sm:py-4" key={Elementgroup}>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <img className="w-12 h-12 rounded-full" src="https://umbraco.com/media/r5nfrprt/code_too.png?quality=80" alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0 ">

                                            <p className="text-lg font-bold text-gray-900 truncate dark:text-white">
                                                {Elementgroup.name}
                                            </p>
                                            <p className="text-lg text-gray-500  dark:text-gray-400">
                                                {Elementgroup.tag}
                                            </p>

                                        </div>

                                    </div>
                                    {Elementgroup.projectelements.length == 0 ? (<> <div className="mt-6 ml-16">No elements added yet</div> </>) : (
                                        <>
                                            {Elementgroup.projectelements.map((element, i) => (
                                                <>
                                                  <Element element = {element} index={i} />  
                                                </>
                                            ))}
                                        </>
                                    )}

                                </li>
                            </>
                        ))}
                    </>
                )}
            </ul>
        </div>
    );
}
