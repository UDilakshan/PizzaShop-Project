import React, { useState, useEffect } from 'react';
import { MdFastfood, MdCloudUpload, MdDelete, MdAttachMoney, MdDescription } from 'react-icons/md';
import { Spinner } from '../components'; 
import { storage } from '../firebase.config';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const DBNewItem = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [smallPrice, setSmallPrice] = useState("");
  const [largePrice, setLargePrice] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [{ foodItems }, dispatch] = useStateValue();

  const statuses = [
    { id: 1, title: "Premium Non Veg", category: "Premium Non Veg" },
    { id: 2, title: "Starters", category: "Starters" },
    { id: 3, title: "Non Veg", category: "Non Veg" },
    { id: 4, title: "Veg", category: "Veg" },
    { id: 5, title: "Desserts", category: "Desserts" },
    { id: 6, title: "Drinks", category: "Drinks" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/Check/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      }, 
      (error) => {
        console.log(error);
        setFields(true);
        setMsg('Error while uploading : Try Again');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false); 
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully");
          setAlertStatus("success");
          setUploadProgress(0);
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(false);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(false);
    try {
      if (!title || !imageAsset || !category || !description || (!price && !mediumPrice && !smallPrice && !largePrice)) {
        setFields(true);
        setMsg('Required fields cannot be empty!');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false); 
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          price: category === "Veg" || category === "Non Veg"
            ? { medium: mediumPrice, small: smallPrice, large: largePrice }
            : price,
          description: description
        };
  
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data uploaded successfully ✔");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg('Error while uploading : Try Again!!');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false); 
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCategory("");
    setPrice("");
    setMediumPrice("");
    setSmallPrice("");
    setLargePrice("");
    setDescription(""); 
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  const handlePriceChange = (e, size) => {
    const value = e.target.value;
    if (value >= 0) {
      if (size === 'small') setSmallPrice(value);
      else if (size === 'medium') setMediumPrice(value);
      else if (size === 'large') setLargePrice(value);
      else setPrice(value);
    }
  };

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-primary mt-40 relative z-10'>

      <div className='w-[90%] md:w-[75%] border border-gray-600 bg-gray-100 rounded-lg p-4 flex flex-col 
      items-center justify-center gap-4'>
      
        <div className='w-full py-2 border-none flex items-center gap-2 mt-2'>
          <MdFastfood className='text-xl text-gray-800 '/>
          <input 
            type='text' 
            required 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Type title here' 
            className='w-full h-full text-lg bg-transparent 
            outline-none border-none placeholder:text-gray-400'
          />
        </div>

        <p className="w-full text-left text-lg font-semibold mt-4">Select Category</p>
        <div className="w-full flex items-center justify-around gap-1 flex-wrap mt-2 mb-2">
          {statuses && statuses.map((data) => (
            <p
              key={data.id}
              onClick={() => setCategory(data.category)}
              className={`px-2 py-1 rounded-md text-sm font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                data.category === category
                  ? 'bg-black text-white'
                  : 'bg-transparent text-textColor'
              }`}
            >
              {data.title}
            </p>
          ))}
        </div>

        {(category === "Veg" || category === "Non Veg" || category === "Premium Non Veg") ? (
          <div className="flex w-full gap-4 mt-2">
            <div className='flex-1 flex items-center gap-2 border-b border-gray-300'>
              <MdAttachMoney className='text-xl text-gray-800 '/>
              <input 
                type='number' 
                required 
                value={smallPrice} 
                onChange={(e) => handlePriceChange(e, 'small')}
                placeholder='Small price' 
                className='w-full h-full text-lg bg-transparent 
                outline-none border-none placeholder:text-gray-400'
              />
            </div>
            <div className='flex-1 flex items-center gap-2 border-b border-gray-300'>
              <MdAttachMoney className='text-xl text-gray-800 '/>
              <input 
                type='number' 
                required 
                value={mediumPrice} 
                onChange={(e) => handlePriceChange(e, 'medium')}
                placeholder='Medium price' 
                className='w-full h-full text-lg bg-transparent 
                outline-none border-none placeholder:text-gray-400'
              />
            </div>
            <div className='flex-1 flex items-center gap-2 border-b border-gray-300'>
              <MdAttachMoney className='text-xl text-gray-800 '/>
              <input 
                type='number' 
                required 
                value={largePrice} 
                onChange={(e) => handlePriceChange(e, 'large')}
                placeholder='Large price' 
                className='w-full h-full text-lg bg-transparent 
                outline-none border-none placeholder:text-gray-400'
              />
            </div>
          </div>
        ) : (
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdAttachMoney className='text-xl text-gray-800 '/>
            <input 
              type='number' 
              required 
              value={price} 
              onChange={(e) => handlePriceChange(e)}
              placeholder='Type price here: ' 
              className='w-full h-full text-lg bg-transparent 
              outline-none border-none placeholder:text-gray-400'
            />
          </div>
        )}

        <div className='w-full py-2 border-none flex items-center gap-2 mt-2'>
          <MdDescription className='text-xl text-gray-800 '/>
          <input 
            type='text' 
            required 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Type description here' 
            className='w-full h-full text-lg bg-transparent 
            outline-none border-none placeholder:text-gray-400'
          />
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg bg-white">
          {isLoading ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              {!imageAsset ? (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                    <p className="text-gray-500 hover:text-gray-700">Click here to upload</p>
                  </div>
                  <input type="file" name="uploadimage" accept="image/*" onChange={uploadImage} className="w-0 h-0"/>
                </label>
              ) : (
                <div className="relative w-full h-full">
                  <img src={imageAsset} alt="uploaded image" className="w-full h-full object-cover rounded-lg"/>
                  <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out" onClick={deleteImage}>
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="w-full flex items-center justify-between">
          {fields && (
            <div className={`px-4 py-2 bg-${alertStatus === "success" ? "green" : "red"}-200 text-${alertStatus === "success" ? "green" : "red"}-800 text-center rounded-md`}>
              {msg}
            </div>
          )}

          <button type="button" className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold" onClick={saveDetails}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default DBNewItem;

