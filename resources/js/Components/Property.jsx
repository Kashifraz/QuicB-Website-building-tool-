import React, { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSave } from "@fortawesome/free-solid-svg-icons";

export default function projectComponent(props) {

    const [success, setSuccess] = useState(0);
    const { data, setData, post, processing, errors, reset } = useForm({
        id: props.property.id,
        property: props.property.property,
        value: props.property.value,
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
        if (data.value != "" && data.value != props.property.value) {
            post(route("customization.property"), {
                preserveScroll: true,
                onSuccess: () => setSuccess(1),
            });
        }else
        setSuccess(2);

    };

    return (
        <div className="flex items-center mb-5">
            <div className="relative w-4/5 ">
                <label htmlFor="attribute" className="my-2 block text font-bold text-gray-900 dark:text-white">{props.property.property}</label>
                <input
                    type="text"
                    name="value"
                    value={data.value}
                    onChange={onHandleChange}
                    onFocus={() => setSuccess(0)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            {success == 1 && (<>
                <button type="submit" className="py-2 px-3 ml-2 mt-10 text-sm font-medium text-white bg-green-700 rounded-lg border border-blue-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800">
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </>)}

            {success == 2 && (<>
                <button type="submit" onClick={submit} className="py-2 px-3 ml-2 mt-10 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    <FontAwesomeIcon icon={faSave} />
                </button>
            </>)}

            {success == 0 && (<>
                <button type="submit" onClick={submit} className="py-2 px-3 ml-2 mt-10 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <FontAwesomeIcon icon={faSave} />
                </button>
            </>)}

        </div>

    );
}
