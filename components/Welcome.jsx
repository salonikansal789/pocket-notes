import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
export const Welcome =({mobile,setMobile,})=>{
 return (
    
    <div className="flex items-center justify-center h-screen bg-gray-100 md:w-[calc(100%-280px)]">
          <div className="absolute top-4 left-5 md:hidden">
        <FontAwesomeIcon icon={faArrowLeft}  className="text-3lg text-black" onClick={()=>setMobile(!mobile)}/>
      </div>

    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our Website</h1>
      <p className="text-lg text-gray-700">We're glad to have you here. Enjoy your stay!</p>
    </div>
  </div>
  
 );
}