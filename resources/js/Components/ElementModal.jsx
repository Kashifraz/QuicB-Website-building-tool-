import React from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import InputError from "@/Components/InputError";

export default function (props) {
    const [showModal, setShowModal] = React.useState(false);
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        tag: " ",
        type: 0,
        parent_id: " ",
        content: " ",
        component_id: props.component.id,
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
        post(route("admin.addelement"), {
            preserveScroll: true,
            onSuccess: () => setShowModal(false),
        });
    };

    return (
        <>
            <button
                className="bg-blue-700 text-white active:bg-blue-800 font-bold  text-sm px-3 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Add Element
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
                                                Enter Tag
                                            </label>
                                            <input
                                                type="text"
                                                name="tag"
                                                value={data.tag}
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                placeholder="Enter a valid Tag"
                                                required=""
                                                onChange={onHandleChange}
                                            />
                                            <InputError
                                                message={errors.tag}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mb-6">
                                            <label
                                                htmlFor="parent"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                            >
                                                Select Tag type
                                            </label>
                                            <select
                                                name="type"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={onHandleChange}
                                                value={data.type}
                                            >
                                                <option value="0">
                                                    Block
                                                </option>
                                                <option value="1">
                                                    Inline
                                                </option>
                                            </select>
                                            <InputError
                                                message={errors.content}
                                                className="mt-2"
                                            />
                                        </div>



                                        <div className="mb-6">
                                            <label
                                                htmlFor="parent"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                            >
                                                Select parent if any
                                            </label>
                                            <select
                                                name="parent_id"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={onHandleChange}
                                                value={data.parent_id}
                                            >
                                                {props.elements.map(
                                                    (element) => (
                                                        <>
                                                            <option
                                                                value={
                                                                    element.id
                                                                }
                                                            >
                                                                {element.tag}
                                                            </option>
                                                        </>
                                                    )
                                                )}
                                            </select>
                                        </div>

                                        <div className="mb-6">
                                            <label
                                                htmlFor="content"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                            >
                                                Enter Content
                                            </label>
                                            <textarea
                                                name="content"
                                                rows="4"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Enter Content"
                                                value={data.content}
                                                onChange={onHandleChange}
                                            ></textarea>
                                            <InputError
                                                message={errors.content}
                                                className="mt-2"
                                            />
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
