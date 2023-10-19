import { Link } from 'react-router-dom';

import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  return (
    <div className='grid lg:grid-cols-2 gap-24 items-center'>
      <div>
        <h1 className='max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl text-blue-600'>
          A PLATFORM FOR BUY CATTLE FEED.
        </h1>
        <div className='mt-8 max-w-xl text-lg leading-8'>
     
          <h1 className="mt-4 text-2xl font-bold text-black lg:mt-8 sm:text-2xl xl:text-3xl">
            Farms are being fulfilled, and farmers are being empowered. Hello and welcome to,{' '}
            <span className="text-teal-600 underline">"Milk-Matters"</span> your trusted resource for
            high-quality Cattle Feed
          </h1>
          <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
            Grow your Farming With <span className="text-teal-700">Milk-Matters</span>.
          </p>
        </div>
        <div className='mt-10'>
          <Link to='/products' className='btn btn-primary'>
            Our Products
          </Link>
        </div>
      </div>
      <div className='hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box '>
        {carouselImages.map((image) => {
          return (
            <div key={image} className='carousel-item'>
              <img
                src={image}
                className='rounded-box h-full w-80 object-cover'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Hero;
