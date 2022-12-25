import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/Components/Footer";

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex text-center">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                                </Link>
                            </div>
                            {/* <div style={{margin:"1px 0px 0px 300px "}} className="sm:hidden max-w-7xl content-center align-center text-center text-gray-600  py-4 px-4 sm:px-4 lg:px-8 text-2xl font-bold justify-center">
                               Project Editing Canvas
                            </div> */}
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6 px-4 border-l-2">
                            <div className="ml-3 relative ">
                                <Link href="/dashboard">
                                    <FontAwesomeIcon icon={faBackward} />   Back
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <Link href="/dashboard">
                            <FontAwesomeIcon icon={faBackward} />     Back
                        </Link>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
            <Footer /> 
        </div>
           
    );
}
