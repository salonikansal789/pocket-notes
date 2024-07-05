import React from 'react';
import { GroupList } from '../utils/Constants';
 const NavbarItems =({title,color,selectedCategory,setSelectedCategory})=>{
  const handleCategoryChange = () => {
    setSelectedCategory(title);
  };
    const getFirstLetter = (str) => {
        return str
          .split(' ')
          .map(word => word.charAt(0).toUpperCase())
          .join('');
      };
    
      const firstLetter = getFirstLetter(title);
    return (
        <div className={`flex flex-row items-center mx-3 pl-5 pt-5 pb-5 h-12 mt-5 rounded-full cursor-pointer ${
          selectedCategory === title ? 'bg-gray-200' : ''
        } `} onClick={handleCategoryChange}>
             <div className="circle text-white flex items-center justify-center w-10 h-10 text-lg font-bold mr-3" style={{ backgroundColor: color,borderRadius:"50%"

             }}>{firstLetter}</div>
              <h1 className='text-black text-lg font-bold'>{title}</h1>
        </div>
    );
 }
 export default NavbarItems;
