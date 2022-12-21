import React, { useState, useRef } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

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
        <div>
            <label for="value" class="my-2 block text font-bold text-gray-900 dark:text-white">{props.property.property}</label>
            <input type="text" id="value" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
         </div>
    );
}
