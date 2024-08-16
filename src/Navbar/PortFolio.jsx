import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Spinner from '../SpecialSetups/Spinner'; // Adjust the path if needed
import '../CustomCss/portfolio.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Portfolio() {
    const [backgroundVideoUrl, setBackgroundVideoUrl] = useState('');
    const [showBackgroundDialog, setShowBackgroundDialog] = useState(false);
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false); // State to check admin status





    useEffect(() => {

        // Initialize Firebase Auth
        const auth = getAuth();

        // Check if the user is authenticated and if their email matches the admin email
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAdmin(user.email === 'admin@example.com');
            } else {
                setIsAdmin(false);
            }
        });

        // Fetch the background video URL

        const fetchBackgroundVideoUrl = async () => {
            try {
                const docRef = doc(db, 'settings', 'portfolio');
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

        fetchBackgroundVideoUrl();

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const openBackgroundDialog = () => {
        setShowBackgroundDialog(true);
    };

    const closeBackgroundDialog = () => {
        setShowBackgroundDialog(false);
    };

    const changeBackgroundVideo = async () => {
        try {
            const docRef = doc(db, 'settings', 'portfolio');
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
            <div className="relative z-10 w-full">
                <h1 className="text-4xl font-bold text-white font-serif mb-8 text-center hover:bg-black rounded-md zoom shadow-neon p-4">My Portfolio</h1>
                <p className="text-white text-center mb-8">These are my projects and apps I have built. Click on the projects to view their beauty and functionality:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                    <a href="https://cancer-friends.vercel.app/" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 1</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">Cancer Friends</p>
                        <p className="mt-2 text-center">A social media platform for cancer patients to communicate and support each other.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/PorfolioCancerFriends1.jpg?raw=true'
                                alt="Cancer Friends"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>





                    <a href="https://josh-art-site.vercel.app/" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 2</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">Art business for a friend I made.</p>
                        <p className="mt-2 text-center">Helping small businesses get recognized with a professional platform.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/PorfolioStoneArt2.jpg?raw=true'
                                alt="Art Business"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>

                    <a href="https://laughter-now.vercel.app/" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 3</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">Site I made for a friend who specializes in Laughter Coaching.</p>
                        <p className="mt-2 text-center">Helping small businesses get recognized with a professional platform.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/code1Laugh.jpg?raw=true'
                                alt="Art Business"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>

                    <a href="https://suncat-app.vercel.app/" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 4</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">Site I made for a friend who owns and runs a Warehouse that previously never had any online Marketing.</p>
                        <p className="mt-2 text-center">Helping small businesses get recognized with a professional platform.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/cWarehouse.jpg?raw=true'
                                alt="Art Business"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>


                    <a href="https://secret-blogpost.web.app/" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 5</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">Secret Diary I made for fun.</p>
                        <p className="mt-2 text-center">Document your life in a user-friendly manner without anyone finding your personal diary.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/PorfolioSecretDiary3.jpg?raw=true'
                                alt="Secret Diary"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>


                    <a href="https://recipe-app-acd06.web.app/" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 6</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">Store your recipes for traveling.</p>
                        <p className="mt-2 text-center">A fun way to store your secret recipes or share them with the world, great for traveling.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/PorfolioYourRecipe4.jpg?raw=true'
                                alt="Recipe App"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>


                    <a href="https://church-vite-app-new-firebase-file.vercel.app/" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 7</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">Website I made for my church, full first proper FULL STACK WEBSITE.</p>
                        <p className="mt-2 text-center">A full-stack app for my dad's church to display daily scripture posts and videos, and allows users to contact the minister or church with ease.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/PorfolioChurchApp5.jpg?raw=true'
                                alt="Church App"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>

                    <a href="https://gotcha1001.github.io/Zordiac/index.html" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 8</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">Website I made for a daily random reading with over a 1000 quotes.</p>
                        <p className="mt-2 text-center">One of my earliest projects I made with plain simple HTML and some JavaScript code in the early days, But I like it.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/PorfolioZordiacApp6.jpg?raw=true'
                                alt="Zordiac App"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>


                    <a href="https://gotcha1001.github.io/Random-Scripture/index.html" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 9</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">Website I made for a daily random scripture from the Bible and selected random scripture of a topic of choice.</p>
                        <p className="mt-2 text-center">One of my earliest projects I made with plain simple HTML and some JavaScript code in the early days, But I like it as well.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/PorfolioDailyVerse7.jpg?raw=true'
                                alt="Daily Scripture"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>


                    <a href="https://gotcha1001.github.io/PianoNoClick/" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 10</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">Website I made as a game for piano music lovers in the early days.</p>
                        <p className="mt-2 text-center">One of my earliest projects I made with plain simple HTML and some JavaScript code in the early days, But I like it as well.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/PorfolioPianoGameApp8.jpg?raw=true'
                                alt="Piano Game"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>


                    <a href="https://gotcha1001.github.io/RiddleAPIHTML/ " target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 11</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">One of my early projects consuming a API with Daily Riddles.</p>
                        <p className="mt-2 text-center">A fun little app that displays daily riddles for the whole family to contemplate on.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/PorfolioDailyRiddle9.jpg?raw=true'
                                alt="Portfolio"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>


                    <a href="https://gotcha1001.github.io/sex2/index.html" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 12</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">One the early simple HTML Javascraipt projects, Sex App.</p>
                        <p className="mt-2 text-center">A App that is build to boost well being as a human and improve your sex life.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/PorfolioSexApp10.jpg?raw=true '
                                alt="JavaScript Form"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>





                    <a href="https://gotcha1001.github.io/Foodapp/" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 13</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">A random Food App that calculates what you should cook for the comming week .</p>
                        <p className="mt-2 text-center">A fun App that I designed long ago , also a good example of perseverence, as this is such a novice App.</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/PorfolioWhatToCook12.jpg?raw=true'
                                alt="Interactive Map"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>
                    <a href="https://gotcha1001.github.io/CvResponsive/" target="_blank" rel="noopener noreferrer" className="block p-6 gradient-background2 text-white rounded-lg shadow-neon opacity-90 hover:opacity-100 hover:bg-purple-600 transition duration-300">
                        <h2 className="text-xl font-semibold text-center">Project 14</h2>
                        <p className="mt-2 shadow-teal rounded-lg p-1 text-center">A total begginer project with my CV and responsiveness</p>
                        <p className="mt-2 text-center">I am proud that this was my CV created long ago and how far I have come with design</p>
                        <div className="mb-8 flex justify-center items-center mt-5">
                            <img
                                src='https://github.com/Gotcha1001/My-Images-for-sites-Wes/blob/main/PorfolioCV11.jpg?raw=true'
                                alt="Interactive Map"
                                className="object-cover rounded-lg"
                                style={{ height: "200px", width: "200px" }}
                            />
                        </div>
                    </a>
                </div>
                <div className='flex justify-center mt-8'>       {isAdmin && (
                    <button
                        className="px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-green-600 transition duration-300"
                        onClick={openBackgroundDialog}
                    >
                        Change Background Video
                    </button>
                )}</div>

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
