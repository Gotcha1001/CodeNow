import React from 'react';

const PaymentNotify = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-white">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Payment Notification Received</h2>
                <p className="text-lg text-gray-700 text-center">Thank you for your payment. Your transaction was successful.</p>
            </div>
        </div>
    );
};

export default PaymentNotify;
