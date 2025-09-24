import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSelector from "../../../components/ThemeSelector";
import { useAuth } from "../../../context/AuthContext";

const Header = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0}}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-20 flex items-center">
                {/* Logo (Left) */}
                <div className="p-5 border-base-300">
                    <Link to="/" className="flex items-center gap-2.5">
                        <Briefcase className="size-6 text-primary" />
                        <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                            CarrerConnect
                        </span>
                    </Link>
                </div>

                {/* Navigation links (Center) */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex-1 justify-end hidden md:flex">
                        <ul className="menu menu-horizontal px-1 gap-3">
                            <li>
                                <a
                                    onClick={() => navigate("/find-jobs")}
                                    className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-md"
                                >
                                    Find Jobs
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() =>
                                        navigate(
                                            isAuthenticated && user?.role === "employer"
                                                ? "/employer-dashboard"
                                                : "/login"
                                        )
                                    }
                                    className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-md"
                                >
                                    For Employers
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Auth Buttons (Right) */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-end px-5">
                        <ThemeSelector />
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm hidden sm:inline">Welcome, {user?.fullName}</span>
                                <a
                                    href={
                                        user?.role === "employer" ? "/employer-dashboard" : "/find-jobs"
                                    }
                                    className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-md"
                                >
                                    Dashboard
                                </a>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <a href="/login" className="btn btn-ghost btn-sm">
                                    Login
                                </a>
                                <a
                                    href="/signup"
                                    className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-md"
                                >
                                    Signup
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
