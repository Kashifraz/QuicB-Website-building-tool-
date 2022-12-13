import React ,{useState} from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSave } from "@fortawesome/free-solid-svg-icons";

export default function Canvas(props) {
    // const [name, setName] = useState('');
    // setName({name:"kashif"});
    
    const [artists, setArtists] = useState([]);
    // // var arr = { "Company Name": 'Flexiple', "ID": 123}; 
    // setArtists([
    //     ...artists,
    //     {  name: name }
    //   ]);
    //  // alert(artists.name)
    // const { data, setData, post, processing, errors, reset } = useForm({
       
    // });


return (

<div >
    {props.projectComponents.map((projectComponent) => (
        <>
            <div className="mx-20 bg-white border-b border-gray-200 rounded">
                <div class=" w-full sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex justify-between items-center mb-4">
                        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">{projectComponent.name} Component </h5>
                    </div>
                    <div class="flow-root">
                        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                            {projectComponent.projectelementgroups.length == 0 ? (<> <div>No Element Groups exist</div> </>) : (
                                <>
                                    {projectComponent.projectelementgroups.map((Elementgroup) => (
                                        <>
                                            <li class="py-3 sm:py-4">
                                                <div class="flex items-center space-x-4">
                                                    <div class="flex-shrink-0">
                                                        <img class="w-12 h-12 rounded-full" src="https://umbraco.com/media/r5nfrprt/code_too.png?quality=80" alt="Neil image" />
                                                    </div>
                                                    <div class="flex-1 min-w-0 ">

                                                        <p class="text-lg font-bold text-gray-900 truncate dark:text-white">
                                                            {Elementgroup.name}
                                                        </p>
                                                        <p class="text-lg text-gray-500  dark:text-gray-400">
                                                            {Elementgroup.tag}
                                                        </p>

                                                    </div>

                                                </div>
                                                {Elementgroup.projectelements.length == 0 ? (<> <div className="mt-6 ml-16">No elements added yet</div> </>) : (
                                                    <>
                                                        {Elementgroup.projectelements.map((element) => (
                                                            <>
                                                                <div className=" mt-6 ml-12 border-l-4 pl-6 border-indigo-500 bg-light-100 p-3 shadow-lg">
                                                                    <h2> <b className="text-lg">element = {element.tag} </b>  </h2>
                                                                    <span className="mb-4"> {element.type == 0 ? (<> Block </>) : (<> inline </>)} element</span>
                                                                    <form onSubmit={(e) => (alert(e.currentTarget.id))}>
                                                                        {element.content != null &&
                                                                            <div className="w-1/2 mt-2 ">
                                                                                <label for="content" class="mb-2 block text font-bold text-gray-900 dark:text-white">Enter Content</label>
                                                                                <input type="text" id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={element.content} required />
                                                                            </div>

                                                                        }

                                                                        <hr className="my-4" />
                                                                        <div class="mt-3 flex-1 min-w-0 grid grid-cols-2 gap-8 ">
                                                                            <div>
                                                                                {element.projectattributes.length == 0 ? (<>No attributes exist </>) :
                                                                                    (<>
                                                                                        {element.projectattributes.map((attribute) => (
                                                                                            <div>
                                                                                                <label for="attribute" class="mb-2 block text font-bold text-gray-900 dark:text-white">{attribute.name}</label>
                                                                                                <input type="text" id="value" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={attribute.value} required />
                                                                                            </div>
                                                                                        ))}
                                                                                    </>)}
                                                                            </div>

                                                                            <div>
                                                                                {element.projectproperties.length == 0 ? (<>No properties exist </>) :
                                                                                    (<>
                                                                                        {element.projectproperties.map((property) => (
                                                                                            <div>
                                                                                                <label for="attribute" class="mb-2 block text font-bold text-gray-900 dark:text-white">{property.property}</label>
                                                                                                <input type="text" id="value" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={property.value} required />
                                                                                            </div>
                                                                                        ))}
                                                                                    </>)}
                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            type="button" class="mt-3  bg-green-700 text-white active:bg-green-800   px-3 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150">
                                                                            <FontAwesomeIcon icon={faSave} /> Save
                                                                        </button>
                                                                    </form>

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
        </>
    ))}
</div>

);
}
