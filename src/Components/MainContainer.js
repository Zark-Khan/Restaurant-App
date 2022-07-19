import React, { useState, useEffect } from 'react'
import HomeContainer from './HomeContainer'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {motion} from 'framer-motion'
import RowContainer from './RowContainer';
import { useStateValue } from '../Context/StateProvider';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';





function MainContainer() {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);
  
  useEffect(() => {}, [scrollValue])

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer/>

      <section className='w-full my-8'>
        <div className="w-full flex items-center justify-between">
        
        <p className="text-2xl text-headingColor font-semibold capitalize relative 
        before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0
         before:bg-gradient-to-tr from-orange-400 to-orange-600 before:transition-all ease-in-out duration-100">
          Our Fresh & Healthy Fruits
          </p>

          <div className="hidden md:flex items-center gap-3">
             <motion.div 
             whileTap={{scale: 0.75}}
              className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center
             hover:bg-orange-500 cursor-pointer hover:shadow-lg '
             onClick={() => setScrollValue(-600)}>
              <MdChevronLeft className='text-white text-lg' />
             </motion.div>
            
             <motion.div 
             whileTap={{scale: 0.75}}
              className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center
             hover:bg-orange-500 cursor-pointer hover:shadow-lg '
             onClick={() => setScrollValue(600)}>
              <MdChevronRight className='text-white text-lg' />
             </motion.div>
          </div>

        </div>  
          <RowContainer 
          scrollValue = {scrollValue}
          flag={true} 
          data={foodItems?.filter((n) => n.category === 'fruits')}
          />
      </section>

     <MenuContainer />
    {cartShow && <CartContainer/>}
     
    </div>
  )
}

export default MainContainer