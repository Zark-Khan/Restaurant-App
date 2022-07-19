import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import { Categories } from '../Utils/Data'
import Loader from './Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase.config'
import { data } from 'autoprefixer'
import { getAllFoodItems, saveItem } from '../Utils/Firebasefunctions'
import { useStateValue } from '../Context/StateProvider'
import { actionType } from '../Context/Reducer'




function CreateContainer() {
  const [title, setTitle] = useState("")
  const [calories, setCalories] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState(null)
  const [imgAsset, setImgAsset] = useState(null)
  const [field, setField] = useState(false)
  const [alertStatus, setAlertStatus] = useState('danger')
  const [msg, setMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [{ foodItems }, dispatch] = useStateValue();



  const uploadImage = (e) => {
    setIsLoading(true);
    const imgFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imgFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => {
      setField(true);
      setMsg('Error while loading Image : Try again!')
      setAlertStatus('danger')
      setTimeout(() => {
        setField(false);
        setIsLoading(false);
      }, 4000)
    },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImgAsset(downloadURL);
          setIsLoading(false);
          setField(true);
          setMsg('Image Uploaded Succesfully');
          setAlertStatus('success');
          setTimeout(() => {
            setField(false);
          }, 4000);
        })
      })

  }

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imgAsset)
    deleteObject(deleteRef).then(() => {
      setImgAsset(null)
      setIsLoading(false)
      setField(true)
      setMsg('Image Deleted Successfully')
      setAlertStatus('success')
    })
    setTimeout(() => {
      setField(false)
    }, 4000);
  }

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if ((!title || !calories || !imgAsset || !category || !price)){
        setField(true);
        setMsg("Required Fields, can't be empty")
        setAlertStatus('danger')
        setTimeout(() => {
          setField(false);
          setIsLoading(false);
        }, 4000)
     }else{
      const data = {
        id: `${Date.now()}`,
        title: title,
        imageURL : imgAsset,
        category: category,
        calories: calories,
        qty: 1,
        price: price
        
      }
      saveItem(data)
        setIsLoading(false)
        setField(true)
        setMsg('Data Uploaded Successfully')
        clearData();
        setAlertStatus('success')
        clearData();
        setTimeout(() => {
          setField(false)
        }, 4000);
      }

    } catch (error) {
      setField(true);
      setMsg('Error while loading Image : Try again!')
      setAlertStatus('danger')
      setTimeout(() => {
        setField(false);
        setIsLoading(false);
      }, 4000)
    }
    fetchDATA();
  }
  const clearData = () =>{
    setTitle("");
    setImgAsset(null);
    setCalories("")
    setPrice("")
    setCategory('Select Category')
  }

  const fetchDATA = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
      type: actionType.SET_FOOD_ITEMS,
      foodItems : data,
        }) 
   })
} 

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 
flex flex-col items-center justify-center gap-4">
        {
          field && (
            <motion.p className={`w-full p-2 text-center rounded-lg text-lg font-semibold
       ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'} `}>{msg}</motion.p>
          )
        }
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className='text-xl text-gray-700' />
          <input type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Give me a title...'
            className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />
        </div>
        <div className="w-full">
          <select onChange={(e) => setCategory(e.target.value)}
            className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
            <option value="other" className='bg-white'>Select Category</option>
            {Categories && Categories.map(item => (
              <option key={item.id}
                className='text-base border-0 outline-none capitalize bg-white text-headingColor'
                value={item.urlParamName}>{item.name}</option>

            ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300
     w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          )
            : (
              <>
                {!imgAsset ? (<>
                  <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                    <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                      <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
                      <p className='text-gray-500 hover:text-gray-700'>Click here to Upload</p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept='image/*'
                      onChange={uploadImage}
                      className='w-0 h-0' />
                  </label>
                </>)
                  : (
                    <><div className="relative h-full">
                      <img src={imgAsset} className='w-full h-full object-cover' alt="Uploaded Image" />
                      <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none
        hover:shadow-md duration-500 transition-all ease-in-out'
                        onClick={deleteImage}><MdDelete className='text-white' /> </button>
                    </div> </>
                  )}
              </>
            )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdFoodBank className='text-gray-700 text-2xl ' />
            <input type="text" required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder='Calories...'
              className='w-full h-full bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />
          </div>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdAttachMoney className='text-gray-700 text-2xl ' />
            <input type="text" required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Price...'
              className='w-full h-full bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />
          </div>
        </div>
        <div className="flex items-center w-full">
          <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none
       bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={saveDetails}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer