import React, { useState, useRef } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Attribute from "@/Components/Attribute";
import Property from "@/Components/Property";

export default function projectComponent(props) {
    const contentRef = useRef(new Array());
    contentRef.current = [];
    const [content, setContent] = useState();

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     console.log(`Name: ${contentRef[1]}`);
    //   }

    const submit = (e) => {
        e.preventDefault();
        console.log(contentRef.current);
        // post(route("admin.register"));
    };

    const addToRef = (el) => {
        if (el && !contentRef.current.includes(el)) {
            contentRef.current.push(el.value);

        }

    }
    return (
        <div className=" mt-6 ml-12 border-l-4 pl-6 border-indigo-500 bg-light-100 p-3 shadow-lg">
            <h2> <b className="text-lg">props.element = {props.element.tag} </b>  </h2>
            <span className="mb-4"> {props.element.type == 0 ? (<> Block </>) : (<> inline </>)} element</span>

            {props.element.content != null &&

                <div key={props.index} >
                    <form onSubmit={() => alert(content)} className="flex items-center mb-5">
                        <div className="relative w-1/2">

                            <input
                                type="text"
                                value={content}
                                onChange={addToRef}
                                ref={addToRef}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <button type="submit" id={props.element.id} onClick={() => alert(contentRef.current[i])}
                            className="py-2 px-3 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-blue-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800"
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </form>
                </div>

            }

            <hr className="my-4" />
            <div className="mt-3 flex-1 min-w-0 grid grid-cols-2 gap-8 ">
                <div>
                    {props.element.projectattributes.length == 0 ? (<>No attributes exist </>) :
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
                                    <Property property ={property} />
                                </div>
                            ))}
                        </>)}
                </div>
            </div>
            


        </div>
    );
}
