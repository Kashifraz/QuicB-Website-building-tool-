import React, { useEffect } from "react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";

export default function ProfileForm(props) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: props.user.name,
        email: props.user.email,
        current_password: "",
        password: "",
        password_confirmation: "",
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

        post(route("profile.info"));
    };

    const submitPass = (e) => {
        e.preventDefault();

        post(route("profile.pass"));
        reset("current_password","password", "password_confirmation");
    };


    return (
        <div>
            <div className="grid grid-cols-4 gap-1">
                <div className="col-span-2">
                    <p className="mt-9">Update your name and email here</p>
                </div>
                <div className="col-span-2 bg-white overflow-hidden  sm:rounded-lg p-5 ">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel forInput="name" value="Name" />

                            <TextInput
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                handleChange={onHandleChange}
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="email" value="Email" />

                            <TextInput
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                handleChange={onHandleChange}
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton
                                className="ml-4"
                                processing={processing}
                            >
                                Update
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-1 mt-9">
                <div className="col-span-2">
                    <p className="mt-9">Change your password here</p>
                </div>
                <div className="col-span-2 bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 ">
                    <form onSubmit={submitPass}>
                        <div className="mt-4">
                            <InputLabel forInput="password" value="Current Password" />

                            <TextInput
                                type="password"
                                name="current_password"
                                value={data.current_password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                handleChange={onHandleChange}
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="password" value="New Password" />

                            <TextInput
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                handleChange={onHandleChange}
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                forInput="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton
                                className="ml-4"
                                processing={processing}
                            >
                                Update
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
