import React from 'react';
import Modal from './Modal';
import {Form, Formik,Field, ErrorMessage} from 'formik';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/FireBase';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

 const contactValidation = Yup.object().shape({
   name:Yup.string().required('Name is required'),
   email:Yup.string().email('invalid email').required('Email is required'),
 })

const Add = ({isOpen,onClose, isUpdate, contact}) => {

   const addContact  = async (contact) =>{
    try{
      const contactRef = collection(db,'contacts');
      await addDoc(contactRef,contact)
      onClose();
      toast.success('Add Sucessfully')
    }
    catch(error){
       console.log(error)
    }
   }

   const updateContact  = async (contact,id) =>{
    try{
      const contactRef = doc(db,'contacts',id);
      await updateDoc(contactRef,contact);
      onClose();
    }
    catch(error){
       console.log(error)
    }
   }

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
        
        <Formik validationSchema={contactValidation}
          initialValues={isUpdate ? {
             name:contact.name,
             email:contact.email,
          } :
              
            {
            name:'',
            email:'',
          }}
          onSubmit={(values)=>{
            console.log(values)
            isUpdate ? 
            updateContact(values,contact.id) :
            addContact(values)
            
          }}
        >
            <Form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Name</label>
                <Field name='name' className='border h-10'/>
                <div className='text-xs text-red-500'>
                  <ErrorMessage name='name'/>
                </div>
             </div>
             <div className='flex flex-col gap-1'>
                <label htmlFor='email'>Email</label>
                <Field name='email' className='border h-10'/>
                <div className='text-xs text-red-500'>
                  <ErrorMessage name='email'/>
                </div>
             </div>

             <button className='bg-orange px-3 py-1.5 border self-end'>
                {isUpdate ? 'update' : 'Add Contact'}
             </button>
            </Form>
        </Formik>
    
    </Modal>
  )
}

export default Add