import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Spinner from '../SpecialSetups/Spinner'; // Adjust the path if needed
import { getAuth } from 'firebase/auth'; // Import getAuth from Firebase

export default function Pricing() {
    const [backgroundVideoUrl, setBackgroundVideoUrl] = useState('');
    const [showBackgroundDialog, setShowBackgroundDialog] = useState(false);
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false); // State to check if user is admin

    useEffect(() => {
        const fetchBackgroundVideoUrl = async () => {
            try {
                const docRef = doc(db, 'settings', 'pricing');
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

        const checkAdmin = () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user && user.email === 'admin@example.com') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        };

        fetchBackgroundVideoUrl();
        checkAdmin(); // Check if the current user is an admin
    }, []);

    const openBackgroundDialog = () => {
        setShowBackgroundDialog(true);
    };

    const closeBackgroundDialog = () => {
        setShowBackgroundDialog(false);
    };

    const changeBackgroundVideo = async () => {
        try {
            const docRef = doc(db, 'settings', 'pricing');
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
                <h1 className="text-4xl font-bold text-white font-serif mb-8 text-center hover:bg-black rounded-md zoom shadow-sunset">Pricing</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-purple-800 text-white p-6 rounded-lg shadow-neon gradient-background2 transition duration-300">
                        <h2 className="text-2xl font-semibold mb-2 shadow">Package 1</h2>
                        <p className="text-xl font-bold">2 Pages</p>
                        <p className="text-xl mb-4">1000 Rand</p>
                        <p className="text-white">Perfect for small businesses needing a simple web presence.</p>
                    </div>
                    <div className="bg-purple-800 text-white p-6 rounded-lg shadow-neon gradient-background2 transition duration-300">
                        <h2 className="text-2xl font-semibold mb-2">Package 2</h2>
                        <p className="text-xl font-bold">5 Pages</p>
                        <p className="text-xl mb-4">3000 Rand</p>
                        <p className="text-white">Ideal for growing businesses requiring more content.</p>
                    </div>
                    <div className="bg-purple-800 text-white p-6 rounded-lg shadow-neon gradient-background2 transition duration-300">
                        <h2 className="text-2xl font-semibold mb-2">Package 3</h2>
                        <p className="text-xl font-bold">8 Pages</p>
                        <p className="text-xl mb-4">5000 Rand</p>
                        <p className="text-white">Great for businesses needing extensive information and features.</p>
                    </div>
                    <div className="bg-purple-800 text-white p-6 rounded-lg shadow-neon gradient-background2 transition duration-300 col-span-1 sm:col-span-2 lg:col-span-3">
                        <h2 className="text-2xl font-semibold mb-2 shadow-sky rounded-xl p-3">Hosting Charges</h2>
                        <p className="text-xl font-bold">Per Month</p>
                        <p className="text-xl mb-4">200 Rand</p>
                        <p className="text-white">Reliable hosting to keep your website running smoothly.</p>
                    </div>
                </div>
                {isAdmin && ( // Conditionally render the button
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
                            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
                            onClick={closeBackgroundDialog}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
