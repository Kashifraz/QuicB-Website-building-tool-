import React, { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faCheck } from "@fortawesome/free-solid-svg-icons";
import Attribute from "@/Components/Attribute";
import Property from "@/Components/Property";

export default function projectComponent(props) {

    const [success, setSuccess] = useState(0);
    const { data, setData, post, processing, errors, reset } = useForm({
        id: props.element.id,
        content: props.element.content,
    });


    const onHandleChange = (event) => {
        setSuccess(0);
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        if (data.content != "" && data.content != props.element.content) {
            post(route("customization.element"), {
                preserveScroll: true,
                onSuccess: () => setSuccess(true),
            });
        } else
            setSuccess(2);


    };


    return (
        <div className=" mt-6 ml-12 border-l-4 pl-6 border-indigo-500 bg-light-100 p-3 shadow-lg">
            <h2> <b className="text-lg">element = {props.element.tag} </b>  </h2>
            <span className="mb-4 mt-2"> {props.element.type == 0 ? (<> Block </>) : (<> inline </>)} element</span>

            {props.element.content != null &&

                <div key={props.index} >
                    <form className="flex items-center mb-5">
                        <div className="relative w-1/2">

                            <input
                                type="text"
                                name="content"
                                value={data.content}
                                onChange={onHandleChange}
                                onFocus={() => setSuccess(0)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>


                        {success == 1 && (<>
                            <button type="submit" className="py-2 px-3 ml-2  text-sm font-medium text-white bg-green-700 rounded-lg border border-blue-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800">
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                        </>)}

                        {success == 2 && (<>
                            <button type="submit" onClick={submit} className="py-2 px-3 ml-2  text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                        </>)}

                        {success == 0 && (<>
                            <button type="submit" onClick={submit} className="py-2 px-3 ml-2  text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                        </>)}


                    </form>
                </div>

            }

            <hr className="my-4" />
            <div className="mt-3 flex-1 min-w-0 grid grid-cols-2 gap-8 ">
                <div>
                    {props.element.projectattributes.length == 0 ? (<> No attributes exist </>) :
                        (<>
                            {props.element.projectattributes.map((attribute) => (
                                <div key={attribute.id}>
                                    <Attribute attribute={attribute} />
                                </div>
                            ))}
                        </>)}
                </div>

                <div>
                    {props.element.projectproperties.length == 0 ? (<>No properties exist </>) :
                        (<>
                            {props.element.projectproperties.map((property) => (
                                <div key={property.id}>
                                    <Property property={property} />
                                </div>
                            ))}
                        </>)}
                </div>
            </div>

        </div>
    );
}
