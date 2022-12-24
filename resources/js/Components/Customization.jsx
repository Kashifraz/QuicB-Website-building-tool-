import React, { useState, useRef } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import ProjectComponent from "@/Components/ProjectComponent";

export default function Canvas(props) {
    const [show, setShow] = useState(false);
    const [Component_id, setId] = useState();
    return (
        <div >
            {props.projectComponents.length == 0 ? (<><p className="ml-20">No component Added to project!</p></>) : (<>
                {props.projectComponents.map((projectComponent) => (
                    <>
                        <ProjectComponent  projectComponent={projectComponent}/>
                    </>
                ))}
            </>)}

        </div>
    );
}
