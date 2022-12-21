import React from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons"; 
import AttributeModel from "../../Components/AttributeModel";
import PropertyModal from "../../Components/PropertyModal";
import { Inertia } from "@inertiajs/inertia";
import Alertbox from "@/Components/Alertbox";

export default function expense(props) {
    const { flash } = usePage().props;
    function destroyAttribute(e) {
        if (confirm("Are you sure you want to delete?")) {
           Inertia.delete(route("attribute.destroy", e.currentTarget.id));
        }
    }

    function destroyProperty(e) {
        if (confirm("Are you sure you want to delete?")) {
           Inertia.delete(route("property.destroy", e.currentTarget.id));
        }
    }

    return (
        <AdminAuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Showing Element
                    <span dangerouslySetInnerHTML={{ __html: " &nbsp; &lt;", }} ></span>
                    {props.element.tag}
                    <span dangerouslySetInnerHTML={{ __html: "&gt;", }} ></span>
                </h2>
            }
        >
            <Head title="adminDashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden sm:rounded-lg">
                        <div className="p-6 ">
                        {flash.message && 
                            <Alertbox message = {flash.message}  />
                        }
                            <div>
                                <div class="flex items-center space-x-4 bg-white rounded mb-6 p-6 shadow">
                                    <div class="flex-shrink-0">
                                        <img class="w-12 h-12 rounded-full" src="https://umbraco.com/media/r5nfrprt/code_too.png?quality=80" alt="Neil image" />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-lg font-bold text-gray-900 truncate dark:text-white">
                                            <span dangerouslySetInnerHTML={{ __html: "&lt;", }} ></span>
                                            {props.element.tag}
                                            <span dangerouslySetInnerHTML={{ __html: "&gt;", }} ></span>
                                            <span> {props.element.type == 0 ? (<> Block </>) : (<> inline </>)} element</span>
                                        </p>
                                        <p class="text-lg text-gray-500  dark:text-gray-400">
                                            <p>
                                                <b>content</b> = {props.element.content == null ? (<> No Content</>) : (<>{props.element.content}</>)}
                                            </p>
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <div class="inline-flex " >
                                            
                                            <AttributeModel element_id={props.element.id}/>

                                            <PropertyModal element_id ={props.element.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-6 shadow rounded m-0 p-0">

                                    <ul>
                                        {props.attributes.length == 0 ? (<div className="p-6">No Attributes added yet</div>) : (
                                            <>
                                                {props.attributes.map((attribute) => (
                                                    <>
                                                        <li class="flex flex-row">
                                                            <div class="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                                                                <div class="flex flex-col w-10 h-10 justify-center items-center mr-4">
                                                                    <a href="#" class="block relative">
                                                                        <img alt="profil" src="data:image/png;base64,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" class="mx-auto object-cover rounded-full h-10 w-10" />
                                                                    </a>
                                                                </div>
                                                                <div class="flex-1 pl-1">
                                                                    <div class="font-bold dark:text-white">name : {attribute.name}</div>
                                                                    <div class="text-gray-600 dark:text-gray-200 text-sm">value : {attribute.value}</div>
                                                                </div>
                                                                <div class="flex flex-row justify-center">

                                                                <button
                                                                onClick={destroyAttribute}
                                                                id={attribute.id}
                                                                tabIndex="-1"
                                                                type="button"
                                                                class="bg-red-500 hover:bg-grey text-white font-bold py-2 px-2 rounded-lg inline-flex items-center">
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </>
                                                ))}
                                            </>
                                        )}

                                    </ul>

                                </div>
                                <div className="bg-white p-6 shadow rounded m-0 p-0">
                                    <ul>
                                        {props.properties.length == 0 ? (<div className="p-6">No properties added yet</div>) : (
                                            <>
                                                {props.properties.map((property) => (
                                                    <>
                                                        <li class="flex flex-row">
                                                            <div class="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                                                                <div class="flex flex-col w-10 h-10 justify-center items-center mr-4">
                                                                    <a href="#" class="block relative">
                                                                        <img alt="profil" src="data:image/jpeg;base64,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" class="mx-auto object-cover rounded-full h-10 w-10" />
                                                                    </a>
                                                                </div>
                                                                <div class="flex-1 pl-1">
                                                                    <div class="font-bold dark:text-white">name : {property.property}</div>
                                                                    <div class="text-gray-600 dark:text-gray-200 text-sm">value : {property.value}</div>
                                                                </div>
                                                                <div class="flex flex-row justify-center">

                                                                <button
                                                                onClick={destroyProperty}
                                                                id={property.id}
                                                                tabIndex="-1"
                                                                type="button"
                                                                class="bg-red-500 hover:bg-grey text-white font-bold py-2 px-2 rounded-lg inline-flex items-center">
                                                                   
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
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

        </AdminAuthenticatedLayout>
    );
}

