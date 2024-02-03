"use client"
import { useAppContext } from '@/context/GlobalContext';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Login = () => {

    const { login } = useAppContext()
    const router = useRouter()

    const [userdata, setuserdata] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            login(userdata)
            toast.success("user loggedin")
            router.push("/")
        } catch (error) {
            toast.error("error")
        }
        console.log('Form submitted:', userdata);
    };

    return (
        <div className="px-4 py-16 sm:px-6 lg:px-8 mx-auto w-screen h-screen relative">
            <div className="mx-auto max-w-lg shadow-xl absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%] ">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti inventore
                    quaerat mollitia?
                </p>

                <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                    <p className="text-center text-lg font-medium">Log in to your account</p>
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>

                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={userdata.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={userdata.password}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    >
                        log in
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        No account? <a className="underline" href="#">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
