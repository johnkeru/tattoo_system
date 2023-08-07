import React from 'react'
import { Head } from '@inertiajs/react';

const Welcome = () => {
    return (
        <div
            style={{
                backgroundImage: 'url(hero.jpeg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
            className='w-screen h-screen relative'
        >
            <Head title="Welcome" />

            <div className='bg-slate-800/70 absolute top-0 left-0 w-full h-full' />
            <div className='absolute top-0 left-0 w-full h-full text-white text-center'>
                <div className='w-2/4 mx-auto my-20'>
                    <h1 className='text-7xl font-bold mb-10'>OSSMSTP</h1>
                    <p className='text-3xl leading-10'>Online Supplies and Service Management System for Tattoo Project is an application to help the stock management of Tattoo project for an accurate result of the needed materials for the shop.</p>
                </div>

                <div className='flex justify-evenly'>
                    <div className='w-1/3'>
                        <h1 className='text-4xl font-bold mb-10'>Objective of the Study</h1>
                        <p className='text-2xl'>To help the employees to have an efficient and useful tool for managing the products and materials used in the shop</p>
                    </div>

                    <div className='w-1/3'>
                        <h1 className='text-4xl font-bold mb-10'>Significance of the study</h1>
                        <p className='text-2xl'>The study targets the main Tattoo Project branch limited as it handles the stocks and materials that are distributed to all shops associated with it.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome