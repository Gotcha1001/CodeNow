import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signOut,
} from "../firebaseConfig/firebase";
import { FiEye, FiEyeOff } from "react-icons/fi";
import '../CustomCss/reCAPTCHA.css'; // Ensure your styles are imported

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false); // New state for checkbox
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!firstName || !lastName || !gender || !dateOfBirth || !email || !password || !confirmPassword) {
            alert("Please enter all fields");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!termsAccepted) { // Check if terms are accepted
            alert("Please accept the terms and conditions");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`,
            });

            await sendEmailVerification(user);

            setFirstName("");
            setLastName("");
            setGender("");
            setDateOfBirth("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setTermsAccepted(false); // Reset checkbox state
            setErrorMessage("");

            alert("Registered successfully. Please verify your email.");

            // Sign out the user after registration
            await signOut(auth);

            // Redirect to login page after registration
            navigate("/login");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Email is already registered");
            } else {
                setErrorMessage("Error registering user: " + error.message);
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-black via-teal-500 to-purple-900">
            <div className="register-form w-full max-w-md rounded-lg bg-black p-8 text-center shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-white">Register</h2>
                {errorMessage && <p className="mb-4 text-sm text-red-500">{errorMessage}</p>}
                <form onSubmit={handleRegister} autoComplete="off">
                    <div className="mb-4 text-left">
                        <label htmlFor="first-name" className="mb-2 block text-sm font-medium text-white">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="first-name"
                            name="first-name"
                            className="w-full rounded-md border border-gray-300 p-2"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="last-name" className="mb-2 block text-sm font-medium text-white">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="last-name"
                            name="last-name"
                            className="w-full rounded-md border border-gray-300 p-2"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="gender" className="mb-2 block text-sm font-medium text-white">
                            Gender
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center text-white">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    className="mr-2"
                                    checked={gender === "male"}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                Male
                            </label>
                            <label className="flex items-center text-white">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    className="mr-2"
                                    checked={gender === "female"}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="date-of-birth" className="mb-2 block text-sm font-medium text-white">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="date-of-birth"
                            name="date-of-birth"
                            className="w-full rounded-md border border-gray-300 p-2"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full rounded-md border border-gray-300 p-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-white">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full rounded-md border border-gray-300 p-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div
                                className="absolute inset-y-0 right-0 flex items-center px-2"
                                onClick={toggleShowPassword}
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 text-left">
                        <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium text-white">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm-password"
                                name="confirm-password"
                                className="w-full rounded-md border border-gray-300 p-2"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <div
                                className="absolute inset-y-0 right-0 flex items-center px-2"
                                onClick={toggleShowConfirmPassword}
                                style={{ cursor: "pointer" }}
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 text-left flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            className="custom-checkbox"
                            checked={termsAccepted}
                            onChange={handleCheckboxChange}
                            required
                        />
                        <label htmlFor="terms" className="text-sm font-medium text-white">
                            I accept the terms and conditions
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-gradient-to-r from-green-400 to-green-600 py-2 px-4 font-semibold text-white hover:from-green-500 hover:to-green-700"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
