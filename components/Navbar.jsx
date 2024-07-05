import React, { useContext } from 'react';
import NavbarItems from './NavbarItems';
import {groupListData} from '../utils/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {context} from '../context/Api';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';

const Navbar =({popup,setPopUp,mobile,setMobile,groups,selectedCategory,setSelectedCategory})=>{
    
 return (
    <div 
    className={`md:block w-[280px]  overflow-y-auto h-screen py-4 bg-white absolute md:relative z-10 md:translate-x-0  transform transition-transform ${
      mobile ? "translate-x-0" : "-translate-x-[280px]"
    }`}
    >
           <FontAwesomeIcon icon={faArrowLeft} className='text-black ml-4  sm:text-lg cursor-pointer md:hidden ' onClick={()=>setMobile(!mobile)}/>

        <h2 className='text-2xl font-bold text-black ml-5 py-5 '>Pocket Notes</h2>
        <button className='flex flex-row bg-black rounded-3xl py-3 px-3 ml-2 flex-start items-center' onClick={()=>setPopUp(true)} >
        <FontAwesomeIcon icon={faPlus} className="ml-2 text-white text-xl" /> {/* Plus Icon */}
            <p className='text-white mx-3 text[18px]'>Create New Group</p>
        </button>
       
            <div className='flex flex-col mb-5'>
                {
                    groups.map((item,index)=>{
                        return(
                            <React.Fragment key={index}>
                              <NavbarItems 
                              title={item.name}
                              color={item.color}
                              selectedCategory={selectedCategory}
                              setSelectedCategory={setSelectedCategory}

                              />
                            </React.Fragment>
                        )
                    })
                }
            </div>     
   
    </div>
 )
}
export default Navbar;