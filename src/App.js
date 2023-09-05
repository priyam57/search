import './App.css';
import Navbar from './components/Navbar';
import {FiSearch} from 'react-icons/fi';
import {AiFillPlusCircle} from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { collection,  onSnapshot } from 'firebase/firestore';
import { db } from './config/FireBase';
import ContactCard from './components/ContactCard';
import Add from './components/Add';
import Hooks from './Hooks/Hooks';
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Found from './components/Found';


function App() {
  const[contacts,setContacts] = useState([])
  const{isOpen,onOpen,onClose} = Hooks(false)

  const filterContacts = (e)=>{
    const value = e.target.value;
    const contactRef = collection(db,'contacts');

    onSnapshot(contactRef,(snapshot)=>{
      const contactLists = snapshot.docs.map((doc)=>{return{
        id:doc.id,
        ...doc.data(),

      }})
      

      const filteredContacts = contactLists.filter(contact=> contact.name.toLowerCase().includes(value.toLowerCase())
        )
        setContacts(filteredContacts);
      return filteredContacts;
    })

  }



  useEffect(()=>{
    const getContacts = async()=>{
        
      try{
        const contactRef = collection(db,'contacts');

        onSnapshot(contactRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc)=>{return{
            id:doc.id,
            ...doc.data(),
  
          }})
          setContacts(contactLists);
          return contactLists;
        })
        
      }
      catch(error){
        console.log(error)
      }
    }
    getContacts();
  },[])



  return (
     <>
    <div className='max-w-[370px] mx-auto px-4'>
      <Navbar/>
     <div className='flex gap-2'>
     <div className='flex relative items-center flex-grow'>
        <FiSearch className='text-white text-3xl absolute ml-1'/>
        <input onChange={filterContacts} type='text' className='border border-white bg-transparent rounded-md h-10 flex-grow
         text-white pl-9' />
      </div>
     
        <AiFillPlusCircle onClick={onOpen} className='text-5xl text-white cursor-pointer'/>
      
     </div>
     <div className='mt-4 gap-3 flex flex-col'>
       {contacts.length <=0 ? <Found/> : contacts.map((contact)=>(
         <ContactCard key={contact.id} contact={contact}/>
       ))}
     </div>
     </div>
     <Add
      onClose={onClose} isOpen={isOpen}
     />
     <ToastContainer position='border-bottom' top='4000px' />
     </>
   
  );
}

export default App;
