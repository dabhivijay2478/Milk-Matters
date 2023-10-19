import React from 'react'

export default function AppPage() {
    return (
        <div>
            <section class="bg-blue-600 2xl:py-24  mt-10 rounded-2xl ">
                <div class="px-4 mx-auto overflow-hidden bg-blue-600 max-w-7xl sm:px-6 lg:px-8 rounded-xl">
                    <div class="py-10 sm:py-16 lg:py-24 2xl:pl-24">
                        <div class="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-8 2xl:gap-x-20">
                            <div>
                                <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-3xl lg:leading-tight">Empower Your Dairy Farming: Download the Future of Cattle Feed Management Today.</h2>
                                <p class="mt-4 text-base text-gray-50">Your trusted resource for high-quality Cattle Feed Platform : Milk-Matters</p>

                                <div class="flex flex-row items-center mt-8 space-x-4 lg:mt-12">
                                    <button className="btn hover:bg-cyan-500 bg-teal-700 hover:text-white  text-white">
                                        <i class="fa-solid fa-download"></i>
                                        Download
                                    </button>
                                </div>
                            </div>

                            <div class="relative px-12">
                                <svg class="absolute inset-x-0 bottom-0 left-1/2 -translate-x-1/2 -mb-48 lg:-mb-72 text-yellow-300 w-[460px] h-[460px] sm:w-[600px] sm:h-[600px]" fill="currentColor" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                </svg>
                                <img class="relative w-full max-w-xs mx-auto -mb-60 lg:-mb-64" src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/8/iphone-mockup.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
