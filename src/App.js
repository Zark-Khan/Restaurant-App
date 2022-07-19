import React from 'react'
import Header from './Components/Header';
import { Route, Routes} from 'react-router-dom';
import MainContainer from './Components/MainContainer';
import CreateContainer from './Components/CreateContainer';
import { AnimatePresence } from "framer-motion";
import { useStateValue } from './Context/StateProvider';
import { getAllFoodItems } from './Utils/Firebasefunctions';
import { useEffect } from 'react';
import { actionType } from './Context/Reducer';

function App() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchDATA = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
      type: actionType.SET_FOOD_ITEMS,
      foodItems : data,
        }) 
   })
} 

  useEffect(() =>{
    fetchDATA();
  }, [] )
  return (
    <AnimatePresence exitBeforeEnter>
    <div className='wscreen h-auto flex flex-col bg-primary'>
      
      <Header/>
      <main className="mt-16 px-4 md:mt-24 md:px-16 py-2 w-full">
       <Routes>
        <Route path='/' element={<MainContainer/>}/>
        <Route path='/createItem' element={<CreateContainer/>}/>
       </Routes>
      </main>
      
    </div>
    </AnimatePresence>   
  )
}

export default App