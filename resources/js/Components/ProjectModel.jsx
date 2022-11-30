import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import InputError from "@/Components/InputError";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons"; 

export default function (props) {
    const [showModal, setShowModal] = React.useState(false);
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        
        title: " ",
        description: " ",
        public: false,
        user_id: props.user_id,
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
        post(route("project.create"), {
            preserveScroll: true,
            onSuccess: () => setShowModal(false),
        });
    };

    return (
        <>
            <button
                className="bg-blue-700 text-white active:bg-blue-800 font-bold  text px-3 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
            <FontAwesomeIcon icon={faCirclePlus} /> Create Project 
            </button>

            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-full my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="relative p-6 flex-auto">
                                    <form>
                                        <div className="mb-6">
                                            <label
                                                htmlFor="title"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Enter Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={data.title}
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                required=""
                                                onChange={onHandleChange}
                                            />
                                            <InputError
                                                message={errors.title}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mb-6">
                                            <label
                                                htmlFor="content"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                            >
                                                Enter Description
                                            </label>
                                            <textarea
                                                name="description"
                                                rows="4"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={data.description}
                                                onChange={onHandleChange}
                                            ></textarea>
                                            <InputError
                                                message={errors.description}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mb-6">
                                        <label class="inline-flex relative items-center cursor-pointer">
                                            <input type="checkbox" value="" class="sr-only peer" 
                                            name="public" onChange={onHandleChange} />
                                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Public Project</span>
                                        </label>
                                        </div>
                                        <button
                                            type="submit"
                                            onClick={submit}
                                            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Save
                                        </button>

                                        <button
                                            className="ml-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            close
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
