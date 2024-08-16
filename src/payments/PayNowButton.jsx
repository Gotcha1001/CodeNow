import React, { useState } from 'react';

const PayNowButton = () => {
    const merchantId = '25048778'; // Your PayFast Merchant ID
    const merchantKey = 'iumwgehqdvktq'; // Your PayFast Merchant Key
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const returnUrl = `${baseUrl}/payment-success`;
    const cancelUrl = `${baseUrl}/payment-cancel`;
    const notifyUrl = `${baseUrl}/payment-notify`;

    const [selectedPackage, setSelectedPackage] = useState(null);
    const [email, setEmail] = useState('');

    const handlePackageSelect = (packageName, amount) => {
        setSelectedPackage({ packageName, amount });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="flex flex-col items-center mt-8 space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <button
                    onClick={() => handlePackageSelect('Package 1', '1000')}
                    className="bg-purple-800 text-white py-3 px-6 rounded-lg"
                >
                    Package 1 - 1000 Rand
                </button>
                <button
                    onClick={() => handlePackageSelect('Package 2', '3000')}
                    className="bg-purple-800 text-white py-3 px-6 rounded-lg"
                >
                    Package 2 - 3000 Rand
                </button>
                <button
                    onClick={() => handlePackageSelect('Package 3', '5000')}
                    className="bg-purple-800 text-white py-3 px-6 rounded-lg"
                >
                    Package 3 - 5000 Rand
                </button>
            </div>

            {selectedPackage && (
                <form
                    name="PayFastPayNowForm"
                    action="https://payment.payfast.io/eng/process"
                    method="post"
                    className="flex flex-col items-center mt-4"
                >
                    <input type="hidden" name="cmd" value="_paynow" />
                    <input type="hidden" name="merchant_id" value={merchantId} />
                    <input type="hidden" name="merchant_key" value={merchantKey} />
                    <input type="hidden" name="receiver" pattern="[0-9]" value="15698630" />
                    <input type="hidden" name="return_url" value={returnUrl} />
                    <input type="hidden" name="cancel_url" value={cancelUrl} />
                    <input type="hidden" name="notify_url" value={notifyUrl} />
                    <input type="hidden" name="amount" value={selectedPackage.amount} />
                    <input type="hidden" name="item_name" value={selectedPackage.packageName} />
                    <input type="hidden" name="item_description" value={`${selectedPackage.packageName} payment`} />

                    {/* Add the email field */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className="p-2 border rounded mb-4"
                    />

                    <button
                        type="submit"
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                        style={{ minWidth: '200px' }}
                    >
                        Pay Now for {selectedPackage.packageName}
                    </button>
                </form>
            )}
        </div>
    );
};

export default PayNowButton;
