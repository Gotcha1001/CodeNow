import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Spinner from '../SpecialSetups/Spinner'; // Adjust the path if needed
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';

export default function ContactUs() {
    const [backgroundVideoUrl, setBackgroundVideoUrl] = useState('');
    const [showBackgroundDialog, setShowBackgroundDialog] = useState(false);
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchBackgroundVideoUrl = async () => {
            try {
                const docRef = doc(db, 'settings', 'contact-us');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.backgroundMediaUrl) {
                        setBackgroundVideoUrl(data.backgroundMediaUrl);
                    }
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching background video URL:', err);
                setLoading(false);
            }
        };

        const checkAdmin = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                if (user && user.email === 'admin@example.com') {
                    setIsAdmin(true);
                }
            } catch (err) {
                console.error('Error checking admin status:', err);
            }
        };

        fetchBackgroundVideoUrl();
        checkAdmin();
    }, []);

    const openBackgroundDialog = () => {
        setShowBackgroundDialog(true);
    };

    const closeBackgroundDialog = () => {
        setShowBackgroundDialog(false);
    };

    const changeBackgroundVideo = async () => {
        try {
            const docRef = doc(db, 'settings', 'contact-us');
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                // If the document does not exist, create it
                await setDoc(docRef, {
                    backgroundMediaUrl: newVideoUrl,
                    isBackgroundVideo: true
                });
            } else {
                // If the document exists, update it
                await updateDoc(docRef, {
                    backgroundMediaUrl: newVideoUrl,
                    isBackgroundVideo: true
                });
            }
            setBackgroundVideoUrl(newVideoUrl);
            setNewVideoUrl('');
            closeBackgroundDialog();
        } catch (err) {
            console.error('Error updating background video URL:', err);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen p-4 overflow-hidden">
            {backgroundVideoUrl && (
                <video
                    src={backgroundVideoUrl}
                    autoPlay
                    loop
                    muted
                    className="absolute object-cover w-full h-full z-0"
                />
            )}
            <div className="relative z-10 w-full p-4">
                <h1 className="text-4xl font-bold text-white font-serif mb-8 text-center hover:bg-black rounded-md zoom">Contact Us</h1>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-purple-800 text-white p-6 rounded-lg gradient-background2 transition duration-300 shadow-sunset">
                        <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
                        <p className="text-xl mb-4">Email: <a href="mailto:WesleyOlivier443@gmail.com" className="text-blue-400 hover:underline">CodeNow101@gmail.com</a></p>
                        <p className="text-xl mb-4">Phone: <a href="tel:+2780077368" className="text-blue-400 hover:underline">+27 80077368</a></p>
                        <p className="text-xl mb-4">Address: 110 Manfred Drive, Park Hill, Durban North</p>
                    </div>
                    <div className="bg-purple-800 text-white p-6 rounded-lg shadow-sunset gradient-background2 transition duration-300">
                        <h2 className="text-2xl font-semibold mb-2">Banking Details</h2>
                        <p className="text-xl mb-4">Bank: Standard Bank</p>
                        <p className="text-xl mb-4">Account Number: 251884783</p>
                        <p className="text-xl mb-4">Account Holder: MR WW OLIVIER</p>
                        <p className="text-xl mb-4">Branch Code: 051001</p>
                        <p className="text-xl mb-4">SWIFT Code: SBZAZAJJ</p>
                    </div>
                    <div className="bg-purple-800 text-white p-6 rounded-lg shadow-sunset gradient-background2 transition duration-300 col-span-1 lg:col-span-2">
                        <h2 className="text-2xl font-semibold mb-2">Find Us on the Map</h2>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3462.3823989203297!2d31.02028487635248!3d-29.795492019778077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef706fd3a56cb79%3A0xdc374e25b6940870!2s110%20Manfred%20Dr%2C%20Park%20Hill%2C%20Durban%20North%2C%204051!5e0!3m2!1sen!2sza!4v1722203864219!5m2!1sen!2sza"
                                className="w-full h-full rounded-lg"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                    <div className="bg-purple-800 text-white p-6 rounded-lg shadow-teal hover:bg-purple-600 transition duration-300 col-span-1 lg:col-span-2">
                        <h2 className="text-2xl font-semibold mb-2">Follow Us</h2>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/yourpage" className="text-blue-600 hover:text-blue-800"><FaFacebook size={24} /></a>
                            <a href="https://twitter.com/yourpage" className="text-blue-400 hover:text-blue-600"><FaTwitter size={24} /></a>
                            <a href="https://instagram.com/yourpage" className="text-pink-600 hover:text-pink-800"><FaInstagram size={24} /></a>
                            <a href="https://linkedin.com/in/yourpage" className="text-blue-700 hover:text-blue-900"><FaLinkedin size={24} /></a>
                            <a href="https://wa.me/27835429381" className="text-green-500 hover:text-green-700"><FaWhatsapp size={24} /></a>
                        </div>
                    </div>
                </div>
                {isAdmin && (
                    <button
                        className="px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-green-600 transition duration-300"
                        onClick={openBackgroundDialog}
                    >
                        Change Background Video
                    </button>
                )}
            </div>

            {showBackgroundDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Change Background Video</h2>
                        <input
                            type="text"
                            placeholder="Enter video URL"
                            value={newVideoUrl}
                            onChange={(e) => setNewVideoUrl(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md w-full mb-4"
                        />
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600"
                            onClick={changeBackgroundVideo}
                        >
                            Change Video
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                            onClick={closeBackgroundDialog}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
