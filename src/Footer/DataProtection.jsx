import React from "react";

export default function DataProtectionPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-8">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="p-6">
                    <h1 className="mb-4 text-4xl font-bold">DATA PROTECTION POLICY</h1>
                    <p className="mb-4">
                        <strong>July 2024</strong>
                    </p>

                    <div className="mb-4 rounded-lg bg-gray-100 p-4">
                        <h2 className="mb-2 text-2xl font-bold">1. Introduction</h2>
                        <p>
                            Wesley Olivier, trading as CodeNow, is dedicated to safeguarding
                            the personal data of our users. This policy outlines our commitment to data protection, ensuring
                            compliance with the Protection of Personal Information Act (POPIA)
                            and other applicable legislation.
                        </p>
                    </div>

                    <div className="mb-4 rounded-lg bg-gray-100 p-4">
                        <h2 className="mb-2 text-2xl font-bold">2. Purpose of Data Processing</h2>
                        <ul className="list-inside list-disc">
                            <li>Enabling communication and interaction among our users.</li>
                            <li>Facilitating the sharing of messages, photos, and profiles among users.</li>
                            <li>Providing personalized customer support and services.</li>
                            <li>Improving our platform’s functionality and user experience.</li>
                            <li>Ensuring compliance with legal obligations and responding effectively to inquiries and complaints.</li>
                        </ul>
                    </div>

                    <div className="mb-4 rounded-lg bg-gray-100 p-4">
                        <h2 className="mb-2 text-2xl font-bold">3. Legal Basis for Processing</h2>
                        <p>
                            All processing of personal data is conducted on a lawful basis
                            under POPIA, with explicit consent obtained from users for
                            specific processing activities, including the sharing of personal
                            messages, photos, and other content.
                        </p>
                    </div>

                    <div className="mb-4 rounded-lg bg-gray-100 p-4">
                        <h2 className="mb-2 text-2xl font-bold">4. Data Protection Principles</h2>
                        <ul className="list-inside list-disc">
                            <li>Lawfulness, Fairness, and Transparency: Data is processed with user consent and in a transparent manner.</li>
                            <li>Purpose Limitation: Personal data is collected for specified, explicit, and legitimate purposes related to supporting our users.</li>
                            <li>Data Minimization: We collect only the minimum amount of personal data necessary for our purposes.</li>
                            <li>Accuracy: Users are encouraged to keep their information accurate and up to date.</li>
                            <li>Storage Limitation: Personal data is kept only for as long as necessary for the purposes for which it was collected.</li>
                            <li>Integrity and Confidentiality: We implement appropriate technical and organizational measures to ensure the security and confidentiality of personal data.</li>
                        </ul>
                    </div>

                    <div className="mb-4 rounded-lg bg-gray-100 p-4">
                        <h2 className="mb-2 text-2xl font-bold">5. Roles and Responsibilities</h2>
                        <p>
                            <strong>Data Controller:</strong> Wesley Olivier is responsible
                            for overseeing compliance with this policy and applicable data
                            protection laws.
                            <br />
                            <strong>Data Processor:</strong> All employees and contractors
                            processing personal data on behalf of CodeNow must comply with this
                            policy and relevant data protection laws.
                        </p>
                    </div>

                    <div className="mb-4 rounded-lg bg-gray-100 p-4">
                        <h2 className="mb-2 text-2xl font-bold">6. Data Subjects' Rights</h2>
                        <p>
                            Users have the right to access, rectify, and erase their personal
                            data, as well as to restrict or object to its processing. Requests
                            related to these rights should be directed to our Information
                            Officer.
                        </p>
                    </div>

                    <div className="mb-4 rounded-lg bg-gray-100 p-4">
                        <h2 className="mb-2 text-2xl font-bold">7. Cybersecurity and Data Breach Management</h2>
                        <p>
                            We maintain robust cybersecurity measures to protect against
                            unauthorized access, alteration, disclosure, or destruction of
                            personal data. Procedures are in place to detect, investigate, and
                            respond to data breaches promptly.
                        </p>
                    </div>

                    <div className="mb-4 rounded-lg bg-gray-100 p-4">
                        <h2 className="mb-2 text-2xl font-bold">8. Website, Cookies, and Marketing</h2>
                        <p>
                            Our website collects personal information in compliance with data
                            protection laws, ensuring transparency in data processing
                            practices. Users are informed about the use of cookies and have
                            the option to manage cookie preferences.
                        </p>
                    </div>

                    <div className="mb-4 rounded-lg bg-gray-100 p-4">
                        <h2 className="mb-2 text-2xl font-bold">9. Policy Review and Updates</h2>
                        <p>
                            This policy is reviewed regularly to ensure ongoing compliance
                            with data protection laws and best practices. Updates are
                            communicated to employees and users as necessary.
                        </p>
                    </div>

                    <div className="mb-4 rounded-lg bg-gray-100 p-4">
                        <h2 className="mb-2 text-2xl font-bold">10. Contact Information</h2>
                        <p>
                            For questions regarding this policy or to exercise your data
                            protection rights, please contact our Information Officer at{" "}
                            <a
                                href="mailto:info@codenow.com"
                                className="text-blue-500 hover:text-blue-700"
                            >
                                CodeNow101@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
