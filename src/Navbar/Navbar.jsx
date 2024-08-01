import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import '../CustomCss/navbar.css'

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
    const adminDropdownRef = useRef(null);
    const clickSoundRef = useRef(null);
    const navigate = useNavigate();
    const adminEmail = "admin@example.com";

    //drop down menu code share state
    const [isCodeShareDropdownOpen, setIsCodeShareDropdownOpen] = useState(false);
    const codeShareDropdownRef = useRef(null);

    useEffect(() => {
        clickSoundRef.current = new Audio("/Put.mp3");

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const playClickSound = () => {
        clickSoundRef.current.play();
    };

    const logout = async () => {
        try {
            await signOut(auth);
            navigate("/"); // Redirect to the home page after logout
        } catch (error) {
            console.error(error);
        }
    };

    const toggleAdminDropdown = () => {
        setIsAdminDropdownOpen(!isAdminDropdownOpen);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
                setIsAdminDropdownOpen(false);
            }
            if (codeShareDropdownRef.current && !codeShareDropdownRef.current.contains(event.target)) {
                setIsCodeShareDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleCodeShareDropdown = () => { setIsCodeShareDropdownOpen(!isCodeShareDropdownOpen); };

    return (
        <nav className="navbar bg-gray-800 text-white py-4">
            <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center">
                {/* Logo Container */}
                <div className="flex items-center justify-center w-full md:w-auto">
                    <Link to="/" className="text-2xl font-bold zoom horizontal-spin mx-auto" onClick={playClickSound}>
                        <img
                            src="/CodeNowNavbarLogo.png"
                            alt="Logo"
                            className="navbar-logo"
                        />
                    </Link>
                </div>

                {/* Burger Menu Button */}
                <button
                    className="block md:hidden"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                {/* Menu Items */}
                <div
                    className={`flex-col md:flex md:flex-row md:items-center md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`}
                >
                    <ul className="navbar-links flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                        {user ? (
                            <>
                                {user.email === adminEmail && (
                                    <div className="relative navbar-element" ref={adminDropdownRef}>
                                        <button onClick={toggleAdminDropdown} className="bg-black rounded-md p-1 hover:text-blue-500">
                                            Admin Actions
                                        </button>
                                        {isAdminDropdownOpen && (
                                            <ul className="absolute bg-gray-800 text-white rounded mt-2 shadow-lg" onMouseEnter={() => setIsAdminDropdownOpen(true)} onMouseLeave={() => setIsAdminDropdownOpen(false)}>
                                                <li>
                                                    <NavLink
                                                        to="video-upload"
                                                        className={({ isActive }) =>
                                                            isActive ? "active-link text-white block px-4 py-2" : "text-white block px-4 py-2"
                                                        }
                                                        onClick={playClickSound}
                                                    >
                                                        Video Upload
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="video-alter"
                                                        className={({ isActive }) =>
                                                            isActive ? "active-link text-white block px-4 py-2" : "text-white block px-4 py-2"
                                                        }
                                                        onClick={playClickSound}
                                                    >
                                                        Video Alter
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="admin-approve-codeshare"
                                                        className={({ isActive }) =>
                                                            isActive ? "active-link text-white block px-4 py-2" : "text-white block px-4 py-2"
                                                        }
                                                        onClick={playClickSound}
                                                    >
                                                        Approve Code Share
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                )}

                                <li className="md:mr-4 my-2 md:my-0">
                                    <NavLink to="about-us" onClick={playClickSound} className={({ isActive }) =>
                                        isActive ? "active-link" : ""
                                    }>
                                        About Us
                                    </NavLink>
                                </li>
                                <li className="md:mr-4 my-2 md:my-0">
                                    <NavLink to="portfolio" onClick={playClickSound} className={({ isActive }) =>
                                        isActive ? "active-link" : ""
                                    }>
                                        Portfolio
                                    </NavLink>
                                </li>
                                <li className="md:mr-4 my-2 md:my-0">
                                    <NavLink to="pricing" onClick={playClickSound} className={({ isActive }) =>
                                        isActive ? "active-link" : ""
                                    }>
                                        Pricing
                                    </NavLink>
                                </li>
                                <li className="md:mr-4 my-2 md:my-0">
                                    <NavLink to="contact-us" onClick={playClickSound} className={({ isActive }) =>
                                        isActive ? "active-link" : ""
                                    }>
                                        Contact Us
                                    </NavLink>
                                </li>
                                <li className="md:mr-4 my-2 md:my-0">
                                    <NavLink to="testimony" onClick={playClickSound} className={({ isActive }) =>
                                        isActive ? "active-link" : ""
                                    }>
                                        Testimony
                                    </NavLink>
                                </li>
                                <li className="md:mr-4 my-2 md:my-0">
                                    <NavLink to="coding-videos" onClick={playClickSound} className={({ isActive }) =>
                                        isActive ? "active-link" : ""
                                    }>
                                        Coding Videos
                                    </NavLink>
                                </li>
                                <div className="relative navbar-element" ref={codeShareDropdownRef}>
                                    <button onClick={toggleCodeShareDropdown} className="bg-black rounded-md p-2 hover:text-blue-500">
                                        Code Sharing
                                    </button>
                                    {isCodeShareDropdownOpen && (
                                        <ul className="custom-dropdown" onMouseEnter={() => setIsCodeShareDropdownOpen(true)} onMouseLeave={() => setIsCodeShareDropdownOpen(false)}>
                                            <li>
                                                <NavLink
                                                    to="sharing-code"
                                                    className={({ isActive }) =>
                                                        isActive ? "active-link" : ""
                                                    }
                                                    onClick={playClickSound}
                                                >
                                                    Sharing Code
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="submit-code-share"
                                                    className={({ isActive }) =>
                                                        isActive ? "active-link" : ""
                                                    }
                                                    onClick={playClickSound}
                                                >
                                                    Submit Code Sharing
                                                </NavLink>
                                            </li>
                                        </ul>
                                    )}
                                </div>


                                <li className="md:mr-4 my-2 md:my-0">
                                    <NavLink to="code-tips" onClick={playClickSound} className={({ isActive }) =>
                                        isActive ? "active-link" : ""
                                    }>
                                        Code Tips
                                    </NavLink>
                                </li>

                                <li className="md:mr-4 my-2 md:my-0">
                                    <span className="text-white bg-teal-600 p-1 rounded-full mb-3 md:mb-0">{`Welcome, ${user.email}`}</span>
                                </li>
                                <li className="md:mr-4 my-2 md:my-0">
                                    <button onClick={logout} className="text-white hover:text-blue-500">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="md:mr-4 my-2 md:my-0">
                                    <NavLink
                                        to="register"
                                        onClick={playClickSound}
                                        className="text-white hover:text-blue-500"
                                        activeClassName="active-link"
                                    >
                                        Register
                                    </NavLink>
                                </li>
                                <li className="md:mr-4 my-2 md:my-0">
                                    <NavLink
                                        to="login"
                                        onClick={playClickSound}
                                        className="text-white hover:text-blue-500"
                                        activeClassName="active-link"
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );

};

export default Navbar;