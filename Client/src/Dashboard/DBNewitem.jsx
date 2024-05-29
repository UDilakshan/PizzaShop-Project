import React, { useState } from 'react'
import { statuses } from "../utils/style";

const DBNewitem = () => {
  const [itemName, setItemName] = useState("");
  const [category,setCategory] = useState(null);

  return (
    <div className="flex items-center justify-center flex-col pt-4 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
         <InputValueField
            type="text"
            placeHolder={"Item name here"}
            stateFunc={setItemName}
            stateValue={itemName}
          />  
     

      <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses && 
            statuses?.map((data) =>{
            <p 
              key={data.id}
              onClick={() => setCategory(data.category)}
              className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md 
              ${data.category === category ? 
                "bg-red-400  text-primary": "bg-transparent"}`} 
            >   
              {data.title}
            
              </p>
          })}
      
      
      </div>


      </div>
    </div>
  );
};

export const InputValueField = ({
  type, 
  placeHolder, 
  stateValue, 
  stateFunc,
}) => {
  return(
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lime-50 shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />  
    </>
  )
}

export default DBNewitem;