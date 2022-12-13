import React from "react";
import CanvasLayout from "@/Layouts/CanvasLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Inertia } from "@inertiajs/inertia";

export default function ShowProjectCom(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        component_id: 0,
        project_id: props.project.id,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("component.copy"));
    };

    return (
        <>
            {props.showSection ? (
                <>
                    <div class=" mx-12 grid grid-cols-2 gap-4 md:grid-cols-4 overflow-y-auto max-h-80 rounded-lg px-5 pb-5 bg-blue-100 ">
                        {props.components.map((component) => (
                            <div class="max-w-sm py-4 px-8 bg-white shadow-lg rounded-lg mt-10">
                                <div class="flex justify-center sm:justify-end -mt-9">
                                    <form onSubmit={submit}>
                                        <input name="component_id" type="hidden" value={component.id} />
                                        <button type="submit" id={component.id} onClick={(e) => {
                                            setData("component_id", e.currentTarget.id)
                                        }}
                                            class="w-14 h-14 object-cover rounded-full text-blue-800 text-5xl active:text-gray-600">
                                            <FontAwesomeIcon icon={faCircleCheck} />
                                        </button>
                                    </form>

                                </div>
                                <div>
                                    <h2 class="text-gray-800 text-2xl font-semibold">{component.name}</h2>
                                    <p class="mt-2 text-gray-600"> {component.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) :
                (<></>)}

        </>
    );
}
