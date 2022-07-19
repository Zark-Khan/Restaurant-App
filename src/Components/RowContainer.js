import React from 'react'
import { MdShoppingBasket } from "react-icons/md";
import {motion} from 'framer-motion'
import { useRef } from 'react';
import { useEffect } from 'react'
import NotFound from '../Images/NotFound.svg'
import { useState } from 'react';
import { useStateValue } from '../Context/StateProvider';
import { actionType } from '../Context/Reducer';

function RowContainer({flag, data, scrollValue}) {

    const rowContainer = useRef();

    const [items, setItems] = useState([])

    const [{ cartItems }, dispatch] = useStateValue();

    const addtoCart = () => {
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: items,
    });
      localStorage.setItem('cartItems', JSON.stringify(items))
      
    }

    useEffect(() => {
        addtoCart();
    }, [items])

    useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue])
    
    // onClick={() => setItems([...cartItems, items])}

  return (
    <div 
    ref={rowContainer}
    className={`w-full my-12 flex items-center gap-3 scroll-smooth 
    ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center"}`}>

      {data && data.length > 0 ? (
       data.map((datas) => (
          
        <div  key={datas?.id} className="w-300 h-[260px] min-w-[300px] md:w-340 md:min-w-[340px] my-12 bg-cardOverlay
         rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between">

          <div className='w-full flex items-center justify-between'>
              <motion.div
               whileHover={{scale: 1.2}} 
               className='w-40 h-40 -mt-8 drop-shadow-2xl'
               >
              <img
             
              src={datas?.imageURL}
               alt=""
               className='w-full h-full object-contain' />
              </motion.div>
          <motion.div
          whileTap={{scale: 0.75}}
           className='w-10 h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer mt-1'
          onClick={() => setItems([...cartItems, datas])} >
          <MdShoppingBasket className='text-white'/>
          </motion.div>
          </div>
          <div className="w-full flex flex-col gap-3 items-end justify-end">
              <p className='text-textColor font-semibold text-base md:text-lg'>
                 {datas?.title}
              </p>
              <p className='text-sm mt-1 text-gray-500'>{datas?.calories} Calories</p>
              <div className="flex items-center gap-8">
                  <p className='text-lg text-headingColor font-semibold'>
                      <span className='text-sm text-red-500'>$</span>{datas?.price}
                  </p>
              </div>
          </div>
        </div>

))
) : (<div className='w-full flex flex-col items-center justify-center'>
  <img src={NotFound} className='h-340'/>
  <p className='text-xl text-headingColor font-semibold my-2'>Items Not Available</p>
  </div>
  )}
    </div>
  )
}

export default RowContainer