import React from 'react'
import delivery from '../Images/delivery.png'
import heroBg from '../Images/heroBg.png'
import { heroData } from '../Utils/Data'


function HomeContainer() {
    
  return (
    <section className='grid grid-cols-1  md:grid-cols-2 gap-3 w-full' id='home'>
        <div className="py-5 flex-1 flex flex-col items-start justify-center gap-3">
        <div className='flex items-center gap-2 justify-center bg-orange-200 px-4 py-1 rounded-full'>
        <p className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
        <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
          <img className='w-full h-full object-contain' src={delivery} alt="delivery" />
        </div>
      </div>
      <p className="text-[2.5rem] md:text-[3.75rem] font-bold tracking-wide text-headingColor">
        The Fastest Delivery in <span className='text-orange-600 text-[3rem] md:text-[4.25rem]'>Your City</span> 
      </p>
      <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Mollitia beatae expedita vitae est magnam quis perspiciatis voluptas rem voluptatum nesciunt voluptate maiores,
       officiis sapiente suscipit.
      </p>
      <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto
       px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>Order Now!</button>
      </div>

      <div className="py-2 flex-1 flex items-center relative">
        <img 
        className="h-350 w-full ml-auto lg:w-auto lg:h-510" 
        src={heroBg} 
        alt="Hero Bg"
         />
        <div className="w-full h-full right-10 top-0 mt-2 lg:mt-8 lg:py-2 py-32 left-0 absolute flex flex-wrap gap-4 lg:gap-8
         items-center justify-center">
        {heroData && 
        heroData.map(hero =>(
            <div key={hero.id} className="lg:w-190 p-2 md:p-1 rounded-3xl bg-cardOverlay
             backdrop-blur-md flex flex-col items-center justify-center drop-shadow-lg">
            <img src={hero.imgSrc} className="w-20 -mt10 lg:w-40 lg:-mt-20" alt="i1" />
            <p className='text-base lg:text-lg font-semibold text-textColor mt-2 lg:mt-4' >{hero.name}</p>
            <p className='lg:text-md text-[14px] font-semibold text-lighttextGray my-1 lg:my-3'>{hero.description}</p>
            <p className="text-sm font-semibold text-headingColor">
            <span className='text-xs text-red-600'>$</span>{hero.price}</p>
        </div>
        ))}
         </div>
      </div>
    </section>
  )
}

export default HomeContainer