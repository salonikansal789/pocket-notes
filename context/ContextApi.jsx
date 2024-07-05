import React, { useContext, useEffect, useState }  from 'react';
import Navbar from '../components/Navbar';
import {context} from './Api'
import {notes} from '../utils/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import { Welcome } from '../components/Welcome';
const ContextApi=() =>{
   const [showPopUpValue,setShowPopUpValue]=useState(false);
   const [mobileMenu,setMobileMenu]=useState(false);
   const [groupName, setGroupName] = useState('');
   const [selectedColor, setSelectedColor] = useState('');
   const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem('groups');
    return savedGroups ? JSON.parse(savedGroups) : [];
  });
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('selectedCategory') || '';
  });
  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

   const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleAddNote = () => {
    if (inputValue.trim() === '') return;

    const newNote = {
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      description: inputValue,
      category: selectedCategory // Assuming 'left groups' is the category
    };
    setNotes([...notes, newNote]);
    setInputValue(''); 
// Clear the input field
  };
   const handleSave = () => {
    if (groupName && selectedColor) {
      setGroups([...groups, { name: groupName, color: selectedColor }]);
      setGroupName('');
      setSelectedColor('');
      setShowPopUpValue(false);
    }
  };
  const filteredNotes = notes.filter(item => selectedCategory.includes(item.category));
  const selectedGroup = groups.find(group => group.name === selectedCategory);
  const categoryColor = selectedGroup ? selectedGroup.color : 'bg--gray-100';
  return (
  <div className='flex flex-row'>
      <Navbar popup={showPopUpValue}
      setPopUp={setShowPopUpValue}
      mobile={mobileMenu}
      setMobile={setMobileMenu}
      groups={groups}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      />
   { (notes.length==0 && selectedCategory=='') ?<Welcome
     mobile={mobileMenu}
    setMobile={setMobileMenu} />:<div className='flex flex-col md:w-[calc(100%-280px)] h-screen justify-between' style={{backgroundColor:'red'}}>
    <header className="p-4 bg-black text-white text-left flex flex-row items-center">
    <FontAwesomeIcon icon={faArrowLeft} className='text-white mr-4  sm:text-lg cursor-pointer md:hidden ' onClick={()=>setMobileMenu(!mobileMenu)}/>
    <h1 className='text-white-300 text-xl font-bold'>Heading</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-2" style={{backgroundColor:categoryColor }}>
        <div className="space-y-0">
        {
          filteredNotes.map((item,index)=>{
            return (
            <div key={index} className='px-5 py-5'>                                                         
              <div className='flex md:flex- flex-col '>
                <div className='flex  md:flex-col md:w-[150px] justify-around mb-5'>
                  <p>{item.time}</p>
                  <p>{item.date}</p>
                </div>
                 <p className='md:w-[calc(100%-150px)]'>{item.description}</p>
              </div>
              <hr className="my-5 border-red" />
            </div>
          
            )
          })
    }
        </div>
      </div>
      <footer className="p-4 bg-gray-500 shadow flex items-center">
        <div className="relative flex-grow">
          <textarea
            className="w-full h-24 p-2 border rounded focus:outline-none"
            value={inputValue}
            placeholder="Type your note here..."    onChange={handleInputChange}
          ></textarea>
          <button className="absolute right-2 bottom-2 text-blue-600"  onClick={handleAddNote}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </footer>
    </div>}

    
    {showPopUpValue && (
  <div className='fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50'>
    <div className='bg-white p-4 rounded shadow-lg w-[240px] h-[300px] md:w-[450px] md:h-[220px] sm:w-[250px] '>
      <div className='flex flex-row justify-between'>
      <h2 className='md:text-xl text-lg font-semibold mb-4'>Create New Notes Group</h2>
      <p className='font-bold  text-xl text-black cursor-pointer' onClick={()=>
        {setShowPopUpValue(false);
          setGroupName('');
          setSelectedColor('');
        }
      }>X</p>
      </div>
      <div className='flex  flex-col md:flex-row items-center justify-between'>
        <p className='text-black font-bold mx-3  text-lg'> Group Name</p>
        <input
                className='border-gray-200  border-2  w-[200px] md:w-[260px] rounded-xl px-2 py-1'
                placeholder='Enter your group name...'
                onChange={(e)=>setGroupName(e.target.value)}
                value={groupName}
              />
        </div>
        <div className='flex flex-col md:flex-row  items-center my-5'>
        <p className='text-black font-bold mx-3 text-lg'> Choose Colour</p>
        <div className='ml-5 flex flex-row'>
        <div className="circle text-white flex items-center justify-center w-8 h-8 text-lg font-bold mr-3" style={{ backgroundColor: 'red',borderRadius:"50%"} }                   onClick={() => setSelectedColor('red')}></div>
        <div className="circle text-white flex items-center justify-center w-8 h-8 text-lg font-bold mr-3" style={{ backgroundColor: 'blue',borderRadius:"50%"}} onClick={() => setSelectedColor('blue')}></div>
        <div className="circle text-white flex items-center justify-center w-8 h-8 text-lg font-bold mr-3" style={{ backgroundColor: 'pink',borderRadius:"50%"}}  onClick={() => setSelectedColor('pink')}></div>
        <div className="circle text-white flex items-center justify-center w-8 h-8 text-lg font-bold mr-3" style={{ backgroundColor: 'green',borderRadius:"50%"}}  onClick={() => setSelectedColor('green')}></div>
        <div className="circle text-white flex items-center justify-center w-8 h-8 text-lg font-bold mr-3" style={{ backgroundColor: 'yellow',borderRadius:"50%"}}  onClick={() => setSelectedColor('yellow')}></div>
</div>
        </div>
        <div className='flex justify-end'>
        <button className='bg-black rounded-lg py-1 px-3 flex-start items-center ' onClick={handleSave}>
            <p className='text-white mx-3 text[18px]'>Save</p>
        </button>
        </div>
    </div>
  </div>
)}

  </div>                  
  );
}

export default ContextApi;
