import React from 'react';
import { Head, Link } from '@inertiajs/react';

const Welcome = () => {
    return (
        <div
            className="w-full h-screen bg-cover bg-center relative"
            style={{ backgroundImage: 'url(hero.jpeg)' }}
        >
            <Head title="Welcome" />

            {/* Enhanced Overlay */}
            <div className="absolute inset-0 bg-black/80"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 sm:px-8">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
                        OSSMSTP
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto">
                        Online Supplies and Service Management System for Tattoo
                        Project is an application designed to help manage stock
                        accurately, ensuring the shop has the materials it needs.
                    </p>
                </section>

                {/* Features Section */}
                <section className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-8 sm:space-y-0 w-full max-w-5xl">
                    <div className="text-center sm:w-1/2 px-4">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            Objective of the Study
                        </h2>
                        <p className="text-sm sm:text-lg leading-relaxed">
                            To provide employees with an efficient tool for managing
                            the products and materials used in the shop.
                        </p>
                    </div>
                    <div className="text-center sm:w-1/2 px-4">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            Significance of the Study
                        </h2>
                        <p className="text-sm sm:text-lg leading-relaxed">
                            The study focuses on the main Tattoo Project branch,
                            ensuring efficient stock and material distribution across
                            all associated shops.
                        </p>
                    </div>
                </section>

                {/* Call-to-Action */}
                <section className="mt-12">
                    <Link
                        href="/login"
                        className="bg-blue-600 hover:bg-blue-500 text-white text-lg sm:text-2xl font-bold py-3 px-8 rounded-md transition duration-300"
                    >
                        Get Started
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default Welcome;
