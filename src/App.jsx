import React, { Children } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Navbar/Home';
import Login from './Navbar/Login';
import Register from './Navbar/Register';
import RootLayout from './Navbar/RootLayout';
import ErrorPage from './SpecialSetups/Error';
import VideoUpload from './Navbar/VideoUpload';
import DataProtectionPolicy from './Footer/DataProtection';

// Navbar 
import AboutUs from './Navbar/AboutUs';
import Pricing from './Navbar/Pricing';
import SharingCode from './Navbar/SharingCodes';
import Testimony from './Navbar/Testimony';
import ContactUs from './Navbar/ContactUs';
import Portfolio from './Navbar/PortFolio';

import CodingVideos from './Navbar/CodingVideos';
import CodingTips from './Navbar/CodingTips';
import ModernCoding from './Footer/ModernCoding';
import CodingBlogs from './Footer/CodingBlogs';
import CodingCommunity from './Footer/CodingCommunity';
import VideoAlter from './Navbar/VideoAlter';
import AdminApproveCodeShare from './Navbar/AdminApproveCodeShare';
import SubmitCodeShare from './Navbar/SubmitCodeShare';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'video-upload', element: <VideoUpload /> },
      { path: 'data-protection', element: <DataProtectionPolicy /> },

      { path: 'about-us', element: <AboutUs /> },
      { path: 'pricing', element: <Pricing /> },


      { path: 'sharing-code', element: <SharingCode /> },
      { path: 'admin-approve-codeshare', element: <AdminApproveCodeShare /> },
      { path: 'submit-code-share', element: <SubmitCodeShare /> },




      { path: 'testimony', element: <Testimony /> },
      { path: 'contact-us', element: <ContactUs /> },
      { path: 'portfolio', element: <Portfolio /> },

      { path: 'coding-videos', element: <CodingVideos /> },
      { path: 'code-tips', element: <CodingTips /> },
      { path: 'modern-coding', element: <ModernCoding /> },
      { path: 'coding-blogs', element: <CodingBlogs /> },
      { path: 'coding-community', element: <CodingCommunity /> },
      { path: 'video-alter', element: <VideoAlter /> },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
