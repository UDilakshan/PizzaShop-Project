import React from 'react';
import { useState } from 'react';
import { motion } from "framer-motion";
import {
  MdFastfood, 
  MdCloudUpload, 
  MdDelete,  
  MdAttachMoney } from 'react-icons/md';
import { categories } from '../utils/data'; 
import Loader from '../components/Loader';
import { storage } from '../firebase.config';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from 'react-router-dom';


const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [{ foodItems }, dispatch] = useStateValue();
  const [isPriceValid, setIsPriceValid] = useState(true);



  const Navigate = useNavigate();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];  //can upload only one image(zero index)
    const storageRef = ref(storage, `Images/Category/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

  uploadTask.on('state_changed', 
  (snapshot) => {
    const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  }, 

  (error) => {
    console.log(error);
    setFields(true);
    setMsg('Error while uploading : Try Again😩');
    setAlertStatus('danger');
    setTimeout(() => {
      setFields(false); 
      setIsLoading(false)
    }, 4000);
  },

  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
      setImageAsset(downloadURL);
      setIsLoading(false);
      setFields(true);
      setMsg("Image uploaded successfully🥳")
      setAlertStatus("success")
      setTimeout(() => {
        setFields(false);

      }, 4000)
    })
  }
);

  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false)
      setFields(true);
      setMsg("Image deleted successfully🥳")
      setAlertStatus("success")
      setTimeout(() => {
        setFields(false);

      }, 4000)
    })
  };


  const handlePriceChange = (e) => {
    const inputValue = e.target.value;

    const isValidFloat = /^\d*\.?\d*$/.test(inputValue);



    if (isValidFloat || inputValue === "") {
      setPrice(inputValue);
      setIsPriceValid(true);
    } else {
      setIsPriceValid(false);
    }
  };
  
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !imageAsset || !price || !category) {
        setFields(true);
        setMsg('Required fields can not be empty');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false); 
          setIsLoading(false);
        }, 4000);
      }

      else{
           const data = {
            id:`${Date.now()}`,
            title : title,
            imageURL : imageAsset,
            category : category,
            qty : 1,
            price : price
           }

           saveItem(data)
           setIsLoading(false)
           setFields(true);
           setMsg("Data uploaded successfully🥳")
           setAlertStatus("success")
           setTimeout(() => {
           setFields(false);
        }, 4000);
        clearData();
      }

    } catch (error) {
      console.log(error);  // Move it here if you want to log the caught error
      setFields(true);
      setMsg('Error while uploading : Try Again😩');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false); 
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const clearData = () =>{
    setTitle("");
    setImageAsset(null);
    setPrice("");
    setCategory("Select Category Here");
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  

  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-red-600'>
      <div className='w-[90%] md:w-[75%] border border-gray-300 bg-gray-100 rounded-lg p-4 flex flex-col 
      items-center justify-center gap-4'>
        {
          fields && (
            <motion.p 
            initial={{opacity: 0}} 
            animate={{opacity: 1}} 
            exit={{opacity: 0}} 
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus==='danger' 
              ? 'bg-red-400 text-red-800' 
              : 'bg-emerald-400 text-emerald-800'
              }`}
            >
              {msg}
            </motion.p>
              
          )
        }


        <div className='w-full py-2 border-b border-gray-300 flex
        items-center gap-2'>
          
          <MdFastfood className='text-xl text-gray-800 '/>
          <input 
          type = 'text' 
          required value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Give a name for the food...' 
          className='w-full h-full text-lg bg-transparent 
          outline-none border-none placeholder:text-gray-400'
          />
        </div>

        <div className='w-full'>
         <div className='flex items-center gap-2' >
          <select onChange={(e)=>setCategory(e.target.value)} className='outline-none w-full text-base border-b-2 
          border-gray-200 p-2 rounded-md cursor-pointer'>
            <option value="other" className='bg-white'>Select Category here</option>
            {categories && categories.map(item => (
              <option key={item.id} className='text-base outline-none capitalize bg-orange-100 text-emerald-900'
              value={item.urlParamName}>
                {item.name}
              </option>
              
            ))}
            
          </select>

              <motion.button whileTap={{ scale: 0.6 }}
                type="button"
                className="border-none bg-cartNumBg px-2 hover:bg-black py-1 rounded-lg
                transition-all ease-in-out text-white md:ml-8 md:text-base text-sm"
                onClick={() => Navigate('/EditCategory')}>
                Edit Category
          </motion.button>  
        </div>
        </div>

        <div className='group flex justify-center items-center flex-col
        border-2 border-dotted border-gray-300 w-full h-225 md:h-200
        cursor-pointer rounded-lg'>
          {isLoading ? <Loader /> :<>
           {!imageAsset ? <>
           <label className='w-full h-full flex flex-col items-center
           justify-center cursor-pointer '>
            <div className='w-full h-full flex flex-col items-center
           justify-center gap-2'>
             <MdCloudUpload className='text-gray-500 text-3xl 
             hover:text-gray-700' />
             <p className='text-gray-500 
             hover:text-gray-700 '>Click here to upload</p>
            </div>
            <input  
            type="file" 
            name="uploadimage" 
            accept='image/*'
            onChange={uploadImage} 
            className='w-0 h-0' 
            />
            </label>

           </> : 
           <><div className='relative h-full '>
            <img src={imageAsset} alt="uploaded image" className="w-full h-full object-cover " />
            <button type="button" className='absolute bottom-3 right-3 p-3 rounded-full
            bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all
            ease-in-out '
            onClick={deleteImage}
            ><MdDelete className='text-white'/></button>
            </div></>}
           </>}
        </div>

        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <div className='w-full py-2 border-b border-gray-300 flex
          items-center gap-2'>
            <MdAttachMoney className='text-2xl text-gray-800' />
            <input 
            type='text' 
            required 
            value={price}
            onChange={handlePriceChange}
            placeholder="Price"
            className={`w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 ${
              !isPriceValid ? "border-red-500" : ""
            }`} />

          </div>
        </div>

        <div className='flex items-center w-full '>
          <motion.button whileTap={{scale : 0.6}}
              type='button'
              className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none
               bg-pink-600 px-12 py-2 hover:bg-pink-900 rounded-2xl text-lg text-white font-semibold'
              onClick={saveDetails}> Save
          </motion.button>
        </div>

      </div>
    </div>
  )
}

export default CreateContainer