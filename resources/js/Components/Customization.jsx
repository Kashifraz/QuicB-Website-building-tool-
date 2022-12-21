import React, { useState, useRef } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import ProjectComponent from "@/Components/ProjectComponent";

export default function Canvas(props) {

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

    const addToRef = (el) =>{
        if(el && !contentRef.current.includes(el)){
            contentRef.current.push(el.value);
           
        }
       
    }

    return (
    <div >
        {props.projectComponents.map((projectComponent) => (
            <>
                <div className="mx-20 bg-white border-b border-gray-200 rounded">
                    <div className=" w-full sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{projectComponent.name} Component </h5>
                        </div>
                        <div className="flow-root">
                           <ProjectComponent projectComponent={projectComponent} />
                        </div>
                    </div>

                </div>
            </>
        ))}
    </div>
    );
}
