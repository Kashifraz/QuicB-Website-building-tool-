import React from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import ElementModal from "@/Components/ElementModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEye } from "@fortawesome/free-solid-svg-icons"; 
import { Inertia } from "@inertiajs/inertia";
import InputError from "@/Components/InputError";



export default function expense(props) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: " ",
        tag: " ",
        component_id:props.component.id,
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
        post(route("admin.addelementgroup"),{
            preserveScroll: true,
            onSuccess: () => reset(),
          }  );
        
    };

    function destroyElement(e) {
        if (confirm("Are you sure you want to delete?")) {
            Inertia.delete(route("element.destroy", e.currentTarget.id));
        }
    }

    function destroyElementGroup(e) {
        if (confirm("Are you sure you want to delete?")) {
            Inertia.delete(route("elementgroup.destroy", e.currentTarget.id));
        }
    }

    return (
        <AdminAuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                   Showing Component {props.component.name}
                </h2>
            }
        >
            <Head title="show Component" />

            <h1></h1>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        {flash.message && (
                            <>
                                <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                                    <span class="font-medium">Success!</span> {flash.message}
                                </div>
                            </>
                        )}
                        <div className="p-6 bg-white border-b border-gray-200 rounded">
                            <div class="grid grid-cols-2 gap-4 px-6">

                                <div className="">

                                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white mb-6">Enter Element Group Info</h5>
                                    <form onSubmit={submit}>
                                    <div class="mb-6 ">
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Element Group Name</label>
                                        <input type="text" id="name" name="name" onChange={onHandleChange} value={data.name}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                    <div class="mb-6 ">
                                        <label for="tag" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Element Group tag</label>
                                        <input type="text" id="tag" name="tag" onChange={onHandleChange} value={data.tag}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                                        <InputError message={errors.tag} className="mt-2" />
                                    </div>
                                  
                                    <button type="submit"  class="mb-6  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-left">Submit</button>
                                    </form>
                                </div>

                                <div></div>
                            </div>
                            <hr />
                            <div className=" rounded-lg">

                                <div class=" w-full sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                    <div class="flex justify-between items-center mb-4">
                                        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Added Element Groups</h5>
                                    </div>
                                    <div class="flow-root">
                                        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                           {props.Elementgroups.length == 0 ? (<> <div>No Element Groups added yet</div> </>):(
                                           <>
                                           {props.Elementgroups.map((Elementgroup) => (
                                                <>
                                                    <li class="py-3 sm:py-4">
                                                        <div class="flex items-center space-x-4">
                                                            <div class="flex-shrink-0">
                                                                <img class="w-12 h-12 rounded-full" src="https://umbraco.com/media/r5nfrprt/code_too.png?quality=80" alt="Neil image" />
                                                            </div>
                                                            <div class="flex-1 min-w-0">
                                                                <p class="text-lg font-bold text-gray-900 truncate dark:text-white">
                                                                    {Elementgroup.name}                                                        </p>
                                                                <p class="text-lg text-gray-500  dark:text-gray-400">
                                                                    {Elementgroup.tag}
                                                                </p>
                                                            </div>
                                                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                                <div class="inline-flex " >
                                                                    <button
                                                                        onClick={destroyElementGroup}
                                                                        id={Elementgroup.id}
                                                                        tabIndex="-1"
                                                                        type="button" class="bg-red-700 text-white active:bg-red-800 font-bold text px-3  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150 py-2">
                                                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                                                    </button>

                                                                    <ElementModal elementgroup={Elementgroup} elements={Elementgroup.elements} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {Elementgroup.elements.length == 0 ? (<> <div className="mt-6 ml-16">No elements added yet</div> </>): (
                                                            <>
                                                            {Elementgroup.elements.map((element) => (
                                                            <>
                                                                <div className="mt-6 ml-12 border-l-4 pl-6 border-indigo-500 bg-light-100 p-3 shadow-lg">
                                                                    <h2> <b className="text-lg">element = {element.tag} </b>  </h2>
                                                                    <span> {element.type == 0 ? (<> Block </>) : (<> inline </>)} element</span>
                                                                    <p>
                                                                        <b>content</b> = {element.content == null ? (<> No Content</>) : (<>{element.content}</>)}
                                                                    </p>

                                                                    <button
                                                                        onClick={destroyElement}
                                                                        id={element.id}
                                                                        tabIndex="-1"
                                                                        type="button" class="mt-3  bg-red-700 text-white active:bg-red-800   px-3 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150">
                                                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                                                    </button>

                                                                    <Link
                                                                        class="mt-3 ml-3 bg-green-700 text-white active:bg-green-800   px-3 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                                                                        href={route("element.show", element.id)}>
                                                                        <FontAwesomeIcon icon={faEye} /> Show
                                                                    </Link>
                                                                </div>
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
