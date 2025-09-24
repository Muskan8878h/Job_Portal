import { Briefcase } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-base-200 relative overflow-hidden">
            <div className="relative z-10 px-10 py-16">
                <div className="max-w-6xl mx-auto">
                    {/* main footer content */}
                    <div className="text-center space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-center space-x-2 mb-6">
                                <div className="">
                                    <Briefcase className="size-6 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">CarrerConnect</h3>
                            </div>
                        </div>

                        <p className={`text-sm text-gray-600 max-w-md mx-auto`}>
                            Connecting talented professionals with innovative companies
                            worldwide. Your carrer success is our mision.
                        </p>
                        {/* Copyright */}
                        <div className="space-y-2">
                            <p className={`text-sm text-gray-600`}>
                                &copy; {new Date().getFullYear()} Time to Program.
                            </p>
                            <p className={`text-sm text-gray-500`}>
                                Made with ❤️... Happy Coding
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer