import React from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import ElementModal from "@/Components/ElementModal";
import Alertbox from "@/Components/Alertbox";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faSquareUpRight} from "@fortawesome/free-solid-svg-icons"; 
import { Inertia } from "@inertiajs/inertia";
import InputError from "@/Components/InputError";
import route from "../../../../vendor/tightenco/ziggy/src/js";



export default function expense(props) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: " ",
        component_tag: " ",
        description: " ",
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.addcomponent"),{
            preserveScroll: true,
            onSuccess: () => reset(),
          }  );
        
    };

    function destroyElement(e) {
        if (confirm("Are you sure you want to delete?")) {
            Inertia.delete(route("element.destroy", e.currentTarget.id));
        }
    }

    function destroyComponent(e) {
        if (confirm("Are you sure you want to delete?")) {
            Inertia.delete(route("component.destroy", e.currentTarget.id));
        }
    }

    return (
        <AdminAuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Component
                </h2>
            }
        >
            <Head title="Add Component" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        {flash.message && 
                            <Alertbox message = {flash.message}  />
                        }
                        <div className="p-6 bg-white border-b border-gray-200 rounded">
                            <div class="grid grid-cols-2 gap-4 px-6">

                                <div className="">
                                    <form onSubmit={submit}>
                                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white mb-6">Enter Component Info</h5>
                                    <div class="mb-6 ">
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Component Name</label>
                                        <input type="text" id="name" name="name" onChange={onHandleChange} value={data.name} 
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                    <div class="mb-6 ">
                                        <label for="component_tag" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Component Tag</label>
                                        <input type="text" id="component_tag" name="component_tag" onChange={onHandleChange} value={data.component_tag}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Component Tag" required />
                                        <InputError message={errors.component_tag} className="mt-2" />
                                    </div>
                                    <div className="mb-6 ">
                                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Component Description</label>
                                        <textarea id="description" name="description" onChange={onHandleChange} value={data.description}
                                        rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Component Description"></textarea>
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>
                                    <button type="submit"  class="mb-6 ml-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right">Submit</button>
                                    </form>
                                </div>

                                <div></div>
                            </div>
                            <hr />
                            <div className=" rounded-lg">

                                <div class=" w-full sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                    <div class="flex justify-between items-center mb-4">
                                        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Added Components</h5>
                                    </div>
                                    <div class="flow-root">
                                        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                           {props.components.length == 0 ? (<> <div>No components added yet</div> </>):(
                                           <>
                                           {props.components.map((component) => (
                                                <>
                                                    <li class="py-3 sm:py-4">
                                                        <div class="flex items-center space-x-4">
                                                            <div class="flex-shrink-0">
                                                                <img class="w-12 h-12 rounded-full" src="https://umbraco.com/media/r5nfrprt/code_too.png?quality=80" alt="Neil image" />
                                                            </div>
                                                            <div class="flex-1 min-w-0">
                                                                <p class="text-lg font-bold text-gray-900 truncate dark:text-white">
                                                                    {component.name}                                                        </p>
                                                                <p class="text-lg text-gray-500  dark:text-gray-400">
                                                                    {component.description}
                                                                </p>
                                                            </div>
                                                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                                <div class="inline-flex " >
                                                                    <button
                                                                        onClick={destroyComponent}
                                                                        id={component.id}
                                                                        tabIndex="-1"
                                                                        type="button" class="bg-red-700 text-white active:bg-red-800 font-bold text px-3  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                                                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                                                    </button>
                                                                    
                                                                    <Link
                                                                        href={route("component.show", component.id)}
                                                                        class="bg-blue-700 text-white active:bg-blue-800 font-bold text px-3  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                                                                        <FontAwesomeIcon icon={faSquareUpRight} /> Populate
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
            </div>
        </AdminAuthenticatedLayout>


        // model box code

    );
}
