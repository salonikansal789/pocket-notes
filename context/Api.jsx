import { createContext, useState } from 'react';
import ContextApi from './ContextApi'
export const context=createContext();
const Api=({children})=> {
const [groups, setGroups] = useState([]);
  return (
<context.Provider value={{ groups, setGroups }}>
{children}
</context.Provider>
  );
}

export default Api;
